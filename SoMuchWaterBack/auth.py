from typing import Annotated

import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import SQLModel ,Field ,Session ,select
from pydantic import BaseModel

from .dependencies import get_settings, engine

setting = get_settings()

SECRET_KEY = setting.secret_key
ALGORITHM = setting.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = setting.access_token_expire_minutes

class Admin(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True)
    password: str = Field(index=True)

class TokenData(BaseModel):
    email: str | None = None

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_admin(db, email: str):
    with Session(engine) as session:
        statm = select(Admin).where(Admin.username == email)
        resp = session.exec(statm).all()
        if len(resp) == 1:
            return resp[0]

async def get_current_admin(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except InvalidTokenError:
        raise credentials_exception
    with Session(engine) as session:
        adminDB = session.exec(select(Admin)).all()
        admin = get_admin(adminDB, email=token_data.email)
        if admin is None:
            raise credentials_exception
        return admin