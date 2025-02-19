from datetime import datetime, timedelta, timezone
from typing import Annotated
from contextlib import asynccontextmanager
import logging
import sys
# import lib
import jwt
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from sqlmodel import Field, Session, func, SQLModel, create_engine, select
from pydantic import BaseModel

from .externApi import externApi

SECRET_KEY = "51e14729a14876cffb31272d914eb82e4e79f3112f15a0da5c89a1d7e42cbf12"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


class WaterPrint(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    quantité: str = Field(index=True)
    water_print: int = Field(default=None, index=True)
    path_img: str | None = Field(default=None, index=True)


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


app = FastAPI(lifespan=on_startup)

app.include_router(externApi.router)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

stream_handler = logging.StreamHandler(sys.stdout)
log_formatter = logging.Formatter(
    "%(asctime)s [%(processName)s: %(process)d] [%(threadName)s: %(thread)d] [%(levelname)s] %(name)s: %(message)s"
)
stream_handler.setFormatter(log_formatter)
logger.addHandler(stream_handler)

logger.info("Log mo, log moi")

origins = {
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:5174",
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
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], sesssion: SessionDep
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
def create_product(
    waterprint: WaterPrint,
    session: SessionDep,
    current_admin: Annotated[Admin, Depends(get_current_admin)],
):
    if current_admin:
        if name_exists(waterprint.name):
            session.add(waterprint)
            session.commit()
            session.refresh(waterprint)
            return waterprint
        else:
            return {"error": "Ce produit exists déjà"}
    else:
        return {"error": "acces denied"}


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


@app.patch("/waterprint/{waterprint_id}")
def update_product(
    waterprint_id: int,
    waterprint: WaterPrint,
    session: SessionDep,
    current_admin: Annotated[Admin, Depends(get_current_admin)],
):
    if current_admin:
        statm = select(WaterPrint).where(WaterPrint.id == waterprint_id)
        res = session.exec(statm)
        target = res.one()
        target.name = waterprint.name
        target.water_print = waterprint.water_print
        target.quantité = waterprint.quantité
        session.add(target)
        session.commit()
        session.refresh(target)
        return target
    else:
        return {"error": "acces denied"}


@app.delete("/waterprint/{waterprint_id}")
def delete_product(
    waterprint_id: int,
    session: SessionDep,
    current_admin: Annotated[Admin, Depends(get_current_admin)],
):
    if current_admin:
        statm = select(WaterPrint).where(WaterPrint.id == waterprint_id)
        res = session.exec(statm)
        target = res.one()
        session.delete(target)
        session.commit()
        return {"message": "item supprimer"}
    else:
        return {"error": "acces denied"}


# fileUploader

@app.post("/uploadfile")
async def image_upload(file: UploadFile):
    return {"filename": file.filename}


# vérification des jwt
@app.get("/admin/guard/", response_model=Admin)
async def admin_guard(current_admin: Annotated[Admin, Depends(get_current_admin)]):
    return current_admin
