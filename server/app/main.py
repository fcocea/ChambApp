from fastapi import FastAPI
from app.routers import users, advertisement

app = FastAPI()

app.include_router(users.router)
app.include_router(advertisement.router)

@app.get("/")
def read_root():
    return {"message": "API is running!"}