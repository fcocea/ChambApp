from fastapi import APIRouter
from fastapi_versioning import version
from app.core.database import connect_to_db, close_db_connection

router = APIRouter(
    prefix="/areas",
)


@router.get("/")
@version(1)
async def get_areas():
    connection = await connect_to_db()
    try:
        areas = await connection.fetch('SELECT * FROM "Area";')
        return [dict(area) for area in areas]
    finally:
        await close_db_connection(connection)
