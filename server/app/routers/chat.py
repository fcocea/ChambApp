from fastapi import APIRouter, WebSocket, HTTPException
from typing import Dict, List
from app.core.database import connect_to_db, close_db_connection
from app.core.config import SECRET_KEY, ALGORITHM
import jwt
import asyncpg
import json
from typing import Annotated
from fastapi import Header
import asyncio


router = APIRouter(
    prefix="/chat",
)

active_connections: Dict[str, List[WebSocket]] = {}

global_connections: Dict[str, List[WebSocket]] = {}


async def store_message(chat_id: str, message: str, sender_rut: str):
    query = """
        INSERT INTO "ChatMessage" (chat_id, sender_rut, message)
        VALUES ($1, $2, $3)
    """
    connection = await connect_to_db()
    await connection.execute(query, chat_id, sender_rut, message)
    await close_db_connection(connection)


@router.websocket("/{chat_id}")
async def chat_ws(websocket: WebSocket, chat_id: str, token: str):
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    rut = payload["rut"]

    query = """
        SELECT 
            c.id AS chat_id,
            a.ad_id, 
            a.created_by,
            app.rut AS chamber_rut
        FROM "Chat" c
        JOIN "Advertisement" a 
            ON c.advertisement_id = a.ad_id
        JOIN "AdvertisementApplication" app
            ON a.ad_id = app.ad_id
        WHERE c.id = $1
        AND app.is_accepted = TRUE;
    """

    try:
        connection = await connect_to_db()
        result = await connection.fetchrow(query, chat_id)
        if not result:
            raise HTTPException(status_code=404, detail="Chat not found")
        if result["created_by"] != rut and result["chamber_rut"] != rut:
            raise HTTPException(status_code=403, detail="Forbidden")
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        elif isinstance(e, asyncpg.exceptions.DataError):
            raise HTTPException(status_code=400, detail="Invalid UUID")
        else:
            raise HTTPException(status_code=500, detail=str(e))
    finally:
        await close_db_connection(connection)

    await websocket.accept()
    if chat_id not in active_connections:
        active_connections[chat_id] = []
    active_connections[chat_id].append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            parsed_data = json.loads(data)
            if "message" in parsed_data:
                message = parsed_data["message"]
                user_id = parsed_data["user_id"]
                asyncio.ensure_future(store_message(chat_id, message, user_id))
                for connection in active_connections[chat_id]:
                    if connection != websocket:
                        await connection.send_text(f"{data}")
            else:
                continue

    except Exception:
        pass
    finally:
        active_connections[chat_id].remove(websocket)
        if not active_connections[chat_id]:
            del active_connections[chat_id]


async def listen_new_chats():
    connection = await connect_to_db()
    await connection.add_listener("new_channel", listen_new_chats)
    while True:
        await asyncio.sleep(1)


async def notify_new_chat(connection, pid, channel, payload):
    print("connection", connection)
    print("pid", pid)
    print("channel", channel)
    print("payload", payload)


@router.websocket("/connect")
async def connect_ws(websocket: WebSocket, token: str):
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    rut = payload["rut"]
    await websocket.accept()
    if rut not in global_connections:
        global_connections[rut] = []
    global_connections[rut].append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except Exception:
        pass
    finally:
        global_connections[rut].remove(websocket)


@router.get("/")
async def get_chats(
    access_token: Annotated[str | None, Header(convert_underscores=False)],
):
    if not access_token:
        raise HTTPException(status_code=400, detail="No access token provided")
    payload = jwt.decode(access_token.split(" ")[1], SECRET_KEY, algorithms=[ALGORITHM])
    rut = payload["rut"]
    query = """
        SELECT 
            c.id AS chat_id,
            u_chamber.first_name || ' ' || u_chamber.last_name AS chamber_name,
            u_created_by.first_name || ' ' || u_created_by.last_name AS created_by_name,
            u_chamber.rut = $1 AS you_are_chamber,
            a.created_by,
            cm.message AS last_message,
            cm.sender_rut = $1 AS you_sent,
            cm.created_at::timestamp AT TIME ZONE 'GMT' AT TIME ZONE 'America/Santiago' AS last_message_date
        FROM "Chat" c
        LEFT JOIN "AdvertisementApplication" app
            ON c.advertisement_id = app.ad_id
        LEFT JOIN "Advertisement" a
            ON c.advertisement_id = a.ad_id
        LEFT JOIN "ChatMessage" cm
            ON c.id = cm.chat_id
        LEFT JOIN "User" u_chamber
            ON app.rut = u_chamber.rut
        LEFT JOIN "User" u_created_by
            ON a.created_by = u_created_by.rut
        WHERE ((app.rut = $1 OR a.created_by = $1) AND app.is_accepted = TRUE) AND a.status = 1
        ORDER BY cm.created_at DESC
        LIMIT 1
    """
    connection = await connect_to_db()
    result = await connection.fetch(query, rut)
    await close_db_connection(connection)
    return [dict(chat) for chat in result]


@router.get("/{chat_id}/messages")
async def get_chat_messages(
    chat_id: str, access_token: Annotated[str | None, Header(convert_underscores=False)]
):
    if not access_token:
        raise HTTPException(status_code=400, detail="No access token provided")
    query = """
        SELECT id, chat_id, sender_rut, message, created_at::timestamp AT TIME ZONE 'GMT' AT TIME ZONE 'America/Santiago' AS created_at FROM "ChatMessage" WHERE chat_id = $1 ORDER BY created_at DESC
    """
    connection = await connect_to_db()
    result = await connection.fetch(query, chat_id)
    await close_db_connection(connection)
    data = [dict(message) for message in result]
    return data
