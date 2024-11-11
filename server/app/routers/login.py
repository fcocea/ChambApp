from fastapi import APIRouter
from fastapi_versioning import version
from app.core.database import connect_to_db, close_db_connection
from fastapi import Form
from datetime import datetime, timedelta, timezone
from typing import Dict
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from pydantic import BaseModel
from app.core.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class EmailPasswordRequestForm:
    def __init__(self, email: str = Form(...), password: str = Form(...)):
        self.email = email
        self.password = password


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class User(BaseModel):
    rut: str
    phone: str
    first_name: str
    last_name: str
    birth_date: str
    gender: str | None = None
    email: str
    account_creation_date: str
    rut: str
    can_be_chamber: bool


class UserWithToken(BaseModel):
    token: Token
    user: User


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(user_db, password: str):
    user = user_db[0] if user_db else None

    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_user_from_db(email: str) -> Dict:
    connection = await connect_to_db()
    try:
        query = """
            SELECT * 
            FROM "User" 
            WHERE email = $1
        """
        rows = await connection.fetch(query, email)
        return rows
    finally:
        await close_db_connection(connection)


router = APIRouter(
    prefix="/login",
)


@router.post("/")
@version(1)
async def login_for_access_token(
    form_data: EmailPasswordRequestForm = Depends(),
) -> UserWithToken:
    user_db = await get_user_from_db(form_data.email)
    user = authenticate_user(user_db, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user_dict = dict(user)
    user_dict["birth_date"] = user_dict["birth_date"].isoformat()
    user_dict["account_creation_date"] = user_dict["account_creation_date"].isoformat()
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"rut": user["rut"]}, expires_delta=access_token_expires
    )
    token_response = Token(access_token=access_token, token_type="bearer")

    return UserWithToken(token=token_response, user=user_dict)
