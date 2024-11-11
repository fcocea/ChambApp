from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_versioning import VersionedFastAPI
from app.routers import users, advertisement, login

app = FastAPI()

origins = ["*"]

app.include_router(users.router)
app.include_router(advertisement.router)
app.include_router(login.router)


@app.get("/")
def read_root():
    return {"message": "API is running!"}


app = VersionedFastAPI(
    app, version="1.0", prefix_format="/v{major}", enable_latest=False
)

app.add_middleware(CORSMiddleware, allow_origins=origins)
