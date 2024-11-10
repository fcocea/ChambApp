from fastapi import APIRouter, HTTPException, Query
from fastapi_versioning import version
from typing import List, Optional
from uuid import UUID
from app.core.database import connect_to_db, close_db_connection

router = APIRouter(
    prefix="/advertisement",
)


@router.get("/", response_model=List[dict])
@version(1)
async def get_advertisements(
    area_id: Optional[int] = Query(default=None, description="ID del área"),
    status: Optional[int] = Query(default=None, description="Estado del advertisement"),
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
        if area_id:
            params.append(area_id)
            conditions.append(f"aa.area_id = ${len(params)}")
        if status:
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


@router.get("/{ad_id}", response_model=List[dict])
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

        return [dict(ad) for ad in advertisement]
    finally:
        await close_db_connection(connection)


@router.get("/{ad_id}/applications/", response_model=List[dict])
@version(1)
async def get_advertisement_applications(ad_id: UUID):
    connection = await connect_to_db()
    try:
        check_accepted_query = """
            SELECT 1
            FROM "AdvertisementApplication" aa2
            WHERE aa2.is_accepted = true AND aa2.ad_id = $1;
        """
        accepted_users = await connection.fetch(check_accepted_query, ad_id)
        if accepted_users:
            raise HTTPException(status_code=204)

        query = """
            SELECT 
                u.rut,
                u.first_name,
                u.last_name,
                u.account_creation_date, 
                ARRAY_AGG(DISTINCT p.name) AS professions,
                ARRAY_AGG(DISTINCT a.name) AS areas,
                COALESCE(ROUND((
                    SELECT AVG(h.score_to_ch) 
                    FROM "History" h 
                    WHERE h.rut_ch = u.rut
                ), 2), 0) AS average_score_as_chamber
            FROM 
                "Advertisement" ad 
            INNER JOIN 
                "AdvertisementApplication" aa 
                ON ad.ad_id = aa.ad_id  
            INNER JOIN 
                "AdvertisementArea" aa_area  
                ON ad.ad_id = aa_area.ad_id  
            INNER JOIN 
                "Area" area 
                ON aa_area.area_id = area.area_id 
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
            WHERE 
                ad.ad_id = $1
            GROUP BY 
                u.account_creation_date, u.rut, ad.title, ad.description, ad.ad_id; 
        """
        users = await connection.fetch(query, ad_id)

        if not users:
            raise HTTPException(
                status_code=404, detail="No advertisement applications found."
            )

        return [dict(user) for user in users]
    finally:
        await close_db_connection(connection)
