from fastapi import APIRouter, HTTPException, Query, Header, Response
from fastapi_versioning import version
from typing import List, Optional, Annotated
from uuid import UUID
from app.core.database import connect_to_db, close_db_connection
import jwt
from app.core.config import SECRET_KEY, ALGORITHM
import asyncpg
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(
    prefix="/advertisement",
)


@router.get("/", response_model=List[dict])
@version(1)
async def get_advertisements(
    area_id: Optional[int] = Query(default=None, description="Area ID"),
    status: Optional[int] = Query(default=None, description="Advertisement status"),
):
    connection = await connect_to_db()
    try:
        query = """
            SELECT 
                ad.ad_id, 
                ad.title, 
                ad.description, 
                ad.creation_date, 
                ad.status,
                ad.price,
                ad.start_date,
                ad.address,
                u.rut,
                u.first_name,
                u.last_name
            FROM 
                "Advertisement" ad
            INNER JOIN 
                "AdvertisementArea" aa ON ad.ad_id = aa.ad_id
            INNER JOIN 
                "Area" a ON aa.area_id = a.area_id
            INNER JOIN 
                "User" u ON ad.created_by = u.rut 
            """
        conditions = []
        params = []
        if area_id is not None:
            params.append(area_id)
            conditions.append(f"aa.area_id = ${len(params)}")
        if status is not None:
            params.append(status)
            conditions.append(f"ad.status = ${len(params)}")
        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        query += """
            GROUP BY ad.ad_id, ad.title, ad.description, ad.creation_date, 
            ad.status, ad.price, ad.start_date, ad.address, 
            u.rut, u.first_name, u.last_name;
            """

        rows = await connection.fetch(query, *params)
        if not rows:
            raise HTTPException(status_code=404, detail="No advertisements found.")

        advertisements = [
            {
                "ad_id": row["ad_id"],
                "title": row["title"],
                "description": row["description"],
                "creation_date": row["creation_date"],
                "status": row["status"],
                "price": row["price"],
                "start_date": row["start_date"],
                "address": row["address"],
                "created_by": {
                    "rut": row["rut"],
                    "first_name": row["first_name"],
                    "last_name": row["last_name"],
                },
            }
            for row in rows
        ]

        return advertisements

    finally:
        await close_db_connection(connection)


@router.get("/{ad_id}", response_model=dict)
@version(1)
async def get_advertisement_info(ad_id: UUID):
    connection = await connect_to_db()
    try:
        query = """
            SELECT 
                ad.ad_id, 
                ad.title, 
                ad.description, 
                ad.creation_date, 
                ad.created_by,
                ad.start_date, 
                ad.price,
                ad.status,
                ARRAY_AGG(DISTINCT a.name) AS areas
            FROM 
                "Advertisement" ad 
            INNER JOIN 
                "AdvertisementArea" aa 
                ON ad.ad_id = aa.ad_id 
            INNER JOIN 
                "Area" a 
                ON aa.area_id = a.area_id 
            WHERE 
                ad.ad_id = $1
            GROUP BY
                ad.ad_id, ad.title, ad.description, ad.creation_date;
        """
        advertisement = await connection.fetch(query, ad_id)

        if not advertisement:
            raise HTTPException(status_code=404, detail="Advertisement not found.")
        return dict(advertisement[0])
    finally:
        await close_db_connection(connection)


@router.get("/{ad_id}/applications/", response_model=List[dict] | dict)
@version(1)
async def get_advertisement_applications(ad_id: UUID, response: Response):
    connection = await connect_to_db()
    try:
        check_accepted_query = """
            SELECT 1
            FROM "AdvertisementApplication" aa
            WHERE aa.is_accepted = true AND aa.ad_id = $1;
        """
        accepted_users = await connection.fetch(check_accepted_query, ad_id)
        if accepted_users:
            return {
                "message": "Applications already accepted.",
            }

        query = """
            SELECT 
                u.first_name,
                u.last_name,
                u.account_creation_date, 
                ARRAY_AGG(DISTINCT p.name) AS professions,
                ARRAY_AGG(DISTINCT a.name) AS areas,
                COALESCE(h_stats.average_score, 0) AS average_score,
                COALESCE(h_stats.num_evaluations, 0) AS num_evaluations
            FROM 
                "AdvertisementApplication" aa
            INNER JOIN 
                "User" u 
                ON aa.rut = u.rut
            INNER JOIN 
                "ChamberProfession" cp 
                ON u.rut = cp.rut
            INNER JOIN 
                "Profession" p 
                ON cp.profession_id = p.profession_id
            INNER JOIN 
                "ChamberSpecialize" cs 
                ON u.rut = cs.rut
            INNER JOIN 
                "Area" a 
                ON cs.area_id = a.area_id
            LEFT JOIN LATERAL (
                SELECT 
                    AVG(score_to_ch) AS average_score,
                    COUNT(score_to_ch) AS num_evaluations
                FROM 
                    "History"
                WHERE 
                    rut_ch = u.rut
            ) h_stats ON true
            WHERE 
                aa.ad_id = $1
            GROUP BY 
                u.first_name, u.last_name, u.account_creation_date, u.rut, h_stats.average_score, h_stats.num_evaluations;
        """

        users = await connection.fetch(query, ad_id)
        if not users:
            raise HTTPException(
                status_code=404, detail="No advertisement applications found."
            )
        return [dict(user) for user in users]
    finally:
        await close_db_connection(connection)


@router.post("/{ad_id}/apply/", response_model=dict)
@version(1)
async def advertisement_apply(
    ad_id: UUID,
    Authorization: Annotated[str | None, Header(convert_underscores=False)] = None,
):
    if not Authorization:
        raise HTTPException(status_code=400, detail="No access token provided")
    payload = jwt.decode(Authorization, SECRET_KEY, algorithms=[ALGORITHM])
    rut = payload["rut"]
    connection = await connect_to_db()
    try:
        check_query = """
            SELECT created_by FROM "Advertisement" WHERE ad_id = $1
        """
        ad_owner = await connection.fetchval(check_query, ad_id)

        if ad_owner == rut:
            raise HTTPException(
                status_code=400, detail="User cannot apply to their own advertisement"
            )

        query = """
            INSERT INTO "AdvertisementApplication" (rut, ad_id)
            VALUES ($1, $2)
            RETURNING ad_id
        """
        application_id = await connection.fetchval(query, rut, ad_id)
        return {"message": "Application successful", "application_id": application_id}
    except asyncpg.UniqueViolationError:
        raise HTTPException(
            status_code=400, detail="User has already applied to this advertisement"
        )
    finally:
        await close_db_connection(connection)


class AdvertisementCreate(BaseModel):
    title: str
    description: str
    price: int
    start_date: datetime
    address: str
    areas: List[int]


@router.post("/create", response_model=dict)
@version(1)
async def advertisement_create(
    advertisement: AdvertisementCreate,
    Authorization: Annotated[str | None, Header(convert_underscores=False)] = None,
):
    if not Authorization:
        raise HTTPException(status_code=400, detail="No access token provided")
    payload = jwt.decode(Authorization, SECRET_KEY, algorithms=[ALGORITHM])
    rut = payload["rut"]
    connection = await connect_to_db()
    try:
        query_check_active_advertisement = """
            SELECT 1 
            FROM "Advertisement" 
            WHERE created_by = $1 
            AND status IN (0, 1)
            LIMIT 1;
        """
        existing_ad = await connection.fetchval(query_check_active_advertisement, rut)

        if existing_ad:
            raise HTTPException(
                status_code=400, detail="User already has an active advertisement"
            )

        query = """
            WITH new_advertisement AS (
                INSERT INTO "Advertisement" (ad_id, title, description, price, start_date, created_by, address)
                VALUES (
                    uuid_generate_v4(),
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                )
                RETURNING ad_id
            )
            INSERT INTO "AdvertisementArea" (ad_id, area_id)
            SELECT new_advertisement.ad_id, area_id
            FROM new_advertisement, unnest($7::int[]) AS area_id;
        """
        async with connection.transaction():
            result = await connection.fetchval(
                query,
                advertisement.title,
                advertisement.description,
                advertisement.price,
                advertisement.start_date,
                rut,
                advertisement.address,
                advertisement.areas,
            )
        return {
            "ad_id": result,
            "title": advertisement.title,
            "description": advertisement.description,
            "price": advertisement.price,
            "start_date": advertisement.start_date.isoformat(),
            "address": advertisement.address,
            "areas": advertisement.areas,
            "status": "Created",
        }
    finally:
        await close_db_connection(connection)
