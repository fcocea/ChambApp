from fastapi import APIRouter, WebSocket
from typing import Dict, List

router = APIRouter(
    prefix="/messages",
)

active_connections: Dict[str, List[WebSocket]] = {}


@router.websocket("/{chat_id}")
async def chat_ws(websocket: WebSocket, chat_id: str):
    await websocket.accept()
    if chat_id not in active_connections:
        active_connections[chat_id] = []
    active_connections[chat_id].append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for connection in active_connections[chat_id]:
                if connection != websocket:
                    await connection.send_text(f"{data}")
    except Exception:
        pass
    finally:
        active_connections[chat_id].remove(websocket)
        if not active_connections[chat_id]:
            del active_connections[chat_id]
