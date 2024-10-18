from fastapi import APIRouter
from fastapi_versioning import version
from app.core.database import connect_to_db, close_db_connection

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
