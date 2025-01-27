from datetime import datetime, timedelta, timezone
from typing import Annotated
from contextlib import asynccontextmanager
import logging

import jwt
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from sqlmodel import Field, Session, func, SQLModel, create_engine, select
from pydantic import BaseModel

SECRET_KEY = "51e14729a14876cffb31272d914eb82e4e79f3112f15a0da5c89a1d7e42cbf12"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


class WaterPrint(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    quantité: str = Field(index=True)
    water_print: int = Field(default=None, index=True)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class Admin(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True)
    password: str = Field(index=True)


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


def name_exists(name: str) -> bool:
    with Session(engine) as session:
        statm = (
            select(func.count()).select_from(WaterPrint).where(WaterPrint.name == name)
        )
        result = session.exec(statm).one()
        if result > 0:
            return False
        else:
            return True


@asynccontextmanager
async def on_startup(app: FastAPI):
    create_db_and_tables()
    yield


SessionDep = Annotated[Session, Depends(get_session)]

# fonction password

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_admin(db, email: str):
    with Session(engine) as session:
        statm = select(Admin).where(Admin.username == email)
        resp = session.exec(statm).all()
        logger.info(resp)
        if len(resp) == 1:
            return resp[0]


def authenticated_admin(db, email: str, password: str):
    admin = get_admin(db, email)
    if not admin:
        return False
    if not verify_password(password, admin.password):
        return False
    return admin


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_admin(token: Annotated[str, Depends(oauth2_scheme)]):
    credantials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credential",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithm=ALGORITHM)
        email: str = payload.get("sub")
        if email is None:
            raise credantials_exception
        token_data = TokenData(admin=email)
    except InvalidTokenError:
        raise credantials_exception
    admin = get_admin(connect_db_admin(SessionDep), email=token_data.email)
    if admin is None:
        raise credantials_exception
    return admin


app = FastAPI(lifespan=on_startup)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

origins = {
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
    "file:///home/salvadorgriaule/Bureau/Projet%20Web/FastApi/SoMuchWater/SoMuchWaterFront/dist/index.html",
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


#  Parti Admin


@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    sesssion: SessionDep
) -> Token:
    adminDB = sesssion.exec(select(Admin)).all()
    admin = authenticated_admin(adminDB, form_data.username, form_data.password)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


#  gestion base de donnée


@app.post("/waterprint/")
def create_product(waterprint: WaterPrint, session: SessionDep):
    if name_exists(waterprint.name):
        session.add(waterprint)
        session.commit()
        session.refresh(waterprint)
        return waterprint
    else:
        return {"error": "Ce produit exists déjà"}


@app.get("/waterprint/")
def read_products(session: SessionDep) -> list[WaterPrint]:
    waterprints = session.exec(select(WaterPrint)).all()
    return waterprints


@app.get("/waterprint/{waterprint_id}")
def read_product(waterprint_id: int, session: SessionDep):
    waterprint = session.get(WaterPrint, waterprint_id)
    if not waterprint:
        raise HTTPException(status_code=404, detail="Waterprint not found")
    return waterprint
