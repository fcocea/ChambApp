from fastapi import APIRouter, HTTPException, Header
from fastapi_versioning import version
from typing import List, Annotated
from uuid import UUID
from app.core.database import connect_to_db, close_db_connection
import jwt
from app.core.config import SECRET_KEY, ALGORITHM
import asyncpg
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(
    prefix="/advertisements",
)


@router.get("", response_model=List[dict])
@version(1)
async def get_advertisements(
    Authorization: Annotated[str | None, Header(convert_underscores=False)] = None,
):
    if not Authorization:
        raise HTTPException(status_code=400, detail="No access token provided")
    payload = jwt.decode(Authorization, SECRET_KEY, algorithms=[ALGORITHM])
    rut = payload["rut"]
    connection = await connect_to_db()
    try:
        query = """
            SELECT ad.ad_id,
                ad.title,
                ad.description,
                ad.price,
                ad.start_date,
                ad.address,
                ad.status,
                array_agg(ar.name) AS area_names,
                u.first_name,
                u.last_name
            FROM "Advertisement" AS ad
            JOIN "AdvertisementArea" AS aa ON ad.ad_id = aa.ad_id
            JOIN "User" AS u ON ad.created_by = u.rut
            JOIN "Area" AS ar ON aa.area_id = ar.area_id
            WHERE aa.area_id IN (
                    SELECT cs.area_id
                    FROM "ChamberSpecialize" AS cs
                    WHERE cs.rut = $1
                )
                AND ad.created_by != $1
                AND ad.status = 0
            GROUP BY ad.ad_id, u.first_name, u.last_name;
        """
        advertisements = await connection.fetch(query, rut)

        return [dict(advertisement) for advertisement in advertisements]

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


class ApplicationAcceptBody(BaseModel):
    rut: str


@router.post("/{ad_id}/applications/accept", response_model=List[dict] | dict)
@version(1)
async def accept_advertisement_applications(
    ad_id: UUID,
    body: ApplicationAcceptBody,
    Authorization: Annotated[str | None, Header(convert_underscores=False)] = None,
):
    if not Authorization:
        raise HTTPException(status_code=400, detail="No access token provided")

    payload = jwt.decode(Authorization, SECRET_KEY, algorithms=[ALGORITHM])

    connection = await connect_to_db()
    try:
        check_rut_created_by_query = """
            SELECT created_by FROM "Advertisement" WHERE ad_id = $1;
        """
        ad_owner = await connection.fetchval(check_rut_created_by_query, ad_id)

        if ad_owner != payload["rut"]:
            raise HTTPException(
                status_code=400, detail="User is not the owner of the advertisement"
            )

        check_already_accepted_query = """
            SELECT 1
            FROM "AdvertisementApplication"
            WHERE ad_id = $1 AND is_accepted = true;
        """
        already_accepted = await connection.fetch(check_already_accepted_query, ad_id)
        if already_accepted:
            raise HTTPException(
                status_code=400, detail="Applications already accepted."
            )

        change_status_query = """
            UPDATE "AdvertisementApplication"
            SET is_accepted = true
            WHERE ad_id = $1 AND rut = $2
            RETURNING ad_id, rut, is_accepted;
        """

        async with connection.transaction():
            result = await connection.fetchval(change_status_query, ad_id, body.rut)

        if not result:
            raise HTTPException(status_code=400, detail="Application not found.")

        return {
            "message": "Application accepted.",
        }

    finally:
        await close_db_connection(connection)


@router.post("/{ad_id}/end", response_model=List[dict] | dict)
@version(1)
async def end_advertisement(
    ad_id: UUID,
    Authorization: Annotated[str | None, Header(convert_underscores=False)] = None,
):
    if not Authorization:
        raise HTTPException(status_code=400, detail="No access token provided")

    payload = jwt.decode(Authorization, SECRET_KEY, algorithms=[ALGORITHM])

    connection = await connect_to_db()
    try:
        check_rut_created_by_query = """
            SELECT created_by FROM "Advertisement" WHERE ad_id = $1;
        """
        ad_owner = await connection.fetchval(check_rut_created_by_query, ad_id)

        if ad_owner != payload["rut"]:
            raise HTTPException(
                status_code=400, detail="User is not the owner of the advertisement"
            )

        check_already_accepted_query = """
            SELECT 1
            FROM "AdvertisementApplication"
            WHERE ad_id = $1 AND is_accepted = true;
        """
        already_accepted = await connection.fetch(check_already_accepted_query, ad_id)
        if not already_accepted:
            raise HTTPException(status_code=400, detail="No applications accepted.")

        change_status_query = """
            UPDATE "Advertisement"
            SET status = 2
            WHERE ad_id = $1
            RETURNING ad_id, status;
        """

        async with connection.transaction():
            result = await connection.fetchval(change_status_query, ad_id)

        if not result:
            raise HTTPException(status_code=400, detail="Advertisement not found.")

        return {
            "message": "Advertisement ended.",
        }
    finally:
        await close_db_connection(connection)


@router.get("/{ad_id}/applications", response_model=List[dict] | dict)
@version(1)
async def get_advertisement_applications(ad_id: UUID):
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
                COALESCE(h_stats.num_evaluations, 0) AS num_evaluations,
                u.rut
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


@router.post("/{ad_id}/apply", response_model=dict)
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

        if not ad_owner:
            raise HTTPException(status_code=400, detail="Advertisement does not exist")

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
    start_date: int
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
            SELECT count(*) 
            FROM "Advertisement" 
            WHERE created_by = $1 
            AND status IN (0, 1)
            LIMIT 3;
        """
        existing_ad = await connection.fetchval(query_check_active_advertisement, rut)

        if existing_ad > 3:
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
                datetime.fromtimestamp(advertisement.start_date / 1000).replace(
                    tzinfo=None
                ),
                rut,
                advertisement.address,
                advertisement.areas,
            )
        return {
            "ad_id": result,
            "title": advertisement.title,
            "description": advertisement.description,
            "price": advertisement.price,
            "start_date": advertisement.start_date,
            "address": advertisement.address,
            "areas": advertisement.areas,
            "status": "Created",
        }
    finally:
        await close_db_connection(connection)
