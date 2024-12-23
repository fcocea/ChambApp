from fastapi import APIRouter
from fastapi_versioning import version
from app.core.database import connect_to_db, close_db_connection
from typing import Annotated
import jwt
from fastapi import Header, HTTPException, Query
from app.core.config import SECRET_KEY, ALGORITHM

router = APIRouter(
    prefix="/users",
)


@router.get("/")
@version(1)
async def get_users():
    connection = await connect_to_db()
    try:
        users = await connection.fetch('SELECT * FROM "User";')
        return [dict(user) for user in users]
    finally:
        await close_db_connection(connection)


@router.post("/{rut}/inactive")
@version(1)
async def inactive_user(rut: str):
    connection = await connect_to_db()
    try:
        check_existence_query = """
            SELECT * FROM "User" WHERE rut=$1
        """
        user = await connection.fetch(check_existence_query, rut)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user = user[0]
        if not user["is_active"]:
            raise HTTPException(status_code=400, detail="User is already inactive")

        query = """
            UPDATE "User"
            SET is_active = FALSE
            WHERE rut=$1
        """
        await connection.execute(query, rut)
        return {"message": "User inactivated successfully"}
    finally:
        await close_db_connection(connection)


@router.post("/{rut}/active")
@version(1)
async def active_user(rut: str):
    connection = await connect_to_db()
    try:
        check_existence_query = """
            SELECT * FROM "User" WHERE rut=$1
        """
        user = await connection.fetch(check_existence_query, rut)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user = user[0]
        if user["is_active"]:
            raise HTTPException(status_code=400, detail="User is already active")

        query = """
            UPDATE "User"
            SET is_active = TRUE
            WHERE rut=$1
        """
        await connection.execute(query, rut)
        return {"message": "User activated successfully"}
    finally:
        await close_db_connection(connection)


@router.get("/me")
@version(1)
async def get_me_info(
    access_token: Annotated[str | None, Header(convert_underscores=False)] = None,
):
    if not access_token:
        raise HTTPException(status_code=400, detail="No access token provided")
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        rut = payload["rut"]

        connection = await connect_to_db()
        try:
            query = """
                SELECT rut, phone, first_name, last_name, birth_date, gender, email, account_creation_date, can_be_chamber
                FROM "User"
                WHERE rut=$1
            """
            user = await connection.fetch(query, rut)

        finally:
            await close_db_connection(connection)

        return user[0]

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/me/advertisements")
@version(1)
async def get_my_advertisements(
    Authorization: Annotated[str | None, Header(convert_underscores=False)] = None,
    chamber: bool = Query(False),
):
    if not Authorization:
        raise HTTPException(status_code=400, detail="No access token provided")
    try:
        payload = jwt.decode(
            Authorization.split(" ")[1], SECRET_KEY, algorithms=[ALGORITHM]
        )
        rut = payload["rut"]

        connection = await connect_to_db()
        try:
            if not chamber:
                query = """
                    SELECT 
                        ad.ad_id, 
                        ad.title,
                        ad.status, 
                        ad.price,
                        ad.description,
                        ad.start_date,
                        array_agg(ar.name) AS areas,
                        (SELECT COUNT(*) FROM "AdvertisementApplication" AS app WHERE app.ad_id = ad.ad_id) AS total_applications,
                        (SELECT u.first_name || ' ' || u.last_name FROM "AdvertisementApplication" AS app JOIN "User" AS u ON app.rut = u.rut WHERE app.ad_id = ad.ad_id AND app.is_accepted = TRUE LIMIT 1) AS accepted_chamber,
                        (SELECT id FROM "Chat" AS c WHERE c.advertisement_id = ad.ad_id) AS chat_id
                    FROM 
                        "Advertisement" AS ad 
                    JOIN 
                        "AdvertisementArea" AS aa
                    JOIN 
                        "Area" AS ar 
                    ON aa.area_id = ar.area_id 
                    ON ad.ad_id = aa.ad_id 
                    WHERE created_by=$1 AND (status = '0' OR status = '1')
                    GROUP BY ad.ad_id;
                """
                advertisements = await connection.fetch(query, rut)
                return [dict(advertisement) for advertisement in advertisements]
            else:
                query = """
                    SELECT 
                        ap.is_accepted,
                        a.ad_id,
                        a.title,
                        a.status,
                        a.price,
                        a.description,
                        a.start_date,
                        u.first_name,
                        u.last_name,
                        array_agg(area.name) AS areas,
                        (SELECT id FROM "Chat" AS c WHERE c.advertisement_id = a.ad_id) AS chat_id
                    FROM
                        "AdvertisementApplication" ap
                    LEFT JOIN
                        "Advertisement" a
                    ON 
                        ap.ad_id = a.ad_id
                    LEFT JOIN
                        "AdvertisementArea" aa
                    ON 
                        aa.ad_id = a.ad_id 
                    LEFT JOIN
                        "User" u
                    ON 
                        u.rut = a.created_by
                    LEFT JOIN
                        "Area" area
                    ON
                        aa.area_id = area.area_id
                    WHERE
                        ap.rut = $1 
                        AND a.status IN (0, 1)
                        AND NOT (ap.is_accepted = false AND a.status = 1)
                    GROUP BY 
                        ap.is_accepted,
                        a.ad_id,
                        a.title,
                        a.status,
                        a.price,
                        a.description,
                        a.start_date,
                        u.first_name,
                        u.last_name;
                """
                advertisements = await connection.fetch(query, rut)
                return [dict(advertisement) for advertisement in advertisements]
        finally:
            await close_db_connection(connection)

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/me/history")
@version(1)
async def get_my_history(
    Authorization: Annotated[str | None, Header(convert_underscores=False)] = None,
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1),
):
    if not Authorization:
        raise HTTPException(status_code=400, detail="No access token provided")
    try:
        payload = jwt.decode(
            Authorization.split(" ")[1], SECRET_KEY, algorithms=[ALGORITHM]
        )
        rut = payload["rut"]
        connection = await connect_to_db()
        try:
            query = """
                SELECT 
                    a.ad_id,
                    a.title,
                    a.status,
                    a.price,
                    a.address,
                    a.description,
                    a.start_date,
                    array_agg(ar.name) AS areas,
                    h.end_date,
                    u.first_name AS assigned_to_first_name,
                    u.last_name AS assigned_to_last_name,
                    h.end_date AS end_date,
                    h.score_to_ch AS score_to_chamber
                FROM "History" AS h 
                JOIN "Advertisement" AS a ON h.ad_id = a.ad_id
                JOIN "AdvertisementArea" AS aa ON a.ad_id = aa.ad_id
                JOIN "Area" AS ar ON aa.area_id = ar.area_id
                JOIN "User" AS u ON h.rut_ch = u.rut
                WHERE h.rut_of=$1
                GROUP BY a.ad_id, h.end_date, u.first_name, u.last_name, h.score_to_ch
                ORDER BY h.end_date DESC
                LIMIT $2 OFFSET $3
            """
            history = await connection.fetch(query, rut, limit, (page - 1) * limit)
            return [dict(history) for history in history]
        finally:
            await close_db_connection(connection)
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/{rut}/accept-chamber")
@version(1)
async def accept_request(rut: str):
    connection = await connect_to_db()
    try:
        check_query = """
            SELECT * FROM "User" WHERE rut=$1
        """
        user = await connection.fetch(check_query, rut)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if user[0]["can_be_chamber"]:
            raise HTTPException(status_code=400, detail="User is already a chamber")

        query = """
            UPDATE "User"
            SET can_be_chamber = TRUE
            WHERE rut=$1
        """
        await connection.execute(query, rut)
        return {"message": "Request accepted successfully"}

    finally:
        await close_db_connection(connection)
