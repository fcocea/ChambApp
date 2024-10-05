from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
)


@router.get("/")
async def read_users():
    return [{"username": "Test"}]
