import asyncpg
from .config import DATABASE_URL


async def connect_to_db():
    connection = await asyncpg.connect(DATABASE_URL)
    return connection


async def close_db_connection(connection):
    await connection.close()
