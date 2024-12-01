from fastapi import APIRouter
from fastapi_versioning import version
from app.core.database import connect_to_db, close_db_connection
from typing import Annotated
import jwt
from fastapi import Header, HTTPException
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
                    ad.ad_id, 
                    ad.title,
                    ad.status, 
                    ad.price,
                    ad.description,
                    ad.start_date,  
                    array_agg(ar.name) AS areas,
                    (SELECT COUNT(*) FROM "AdvertisementApplication" AS app WHERE app.ad_id = ad.ad_id) AS total_applications
                FROM 
                    "Advertisement" AS ad 
                JOIN 
                    "AdvertisementArea" AS aa 
                JOIN 
                    "Area" AS ar 
                ON aa.area_id = ar.area_id 
                ON ad.ad_id = aa.ad_id 
                WHERE created_by=$1 AND status='0' OR status='1' 
                GROUP BY ad.ad_id;
            """
            advertisements = await connection.fetch(query, rut)
            return [dict(advertisement) for advertisement in advertisements]
        finally:
            await close_db_connection(connection)
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
