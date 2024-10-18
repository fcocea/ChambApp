from fastapi import APIRouter, Depends
from app.database import connect_to_db, close_db_connection

router = APIRouter(
    prefix="/users",
)


@router.get("/")
async def get_users():
    connection = await connect_to_db()
    try:
        users = await connection.fetch('SELECT * FROM "User";')
        return [dict(user) for user in users] 
    finally:
        await close_db_connection(connection)
