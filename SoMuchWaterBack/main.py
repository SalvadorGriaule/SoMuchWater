from typing import Annotated


from fastapi import FastAPI, Depends , HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session ,func , SQLModel, create_engine, select

class  WaterPrint(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    quantité: str = Field(index=True)
    water_print: int = Field(default=None, index=True)

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

def name_exists(name:str) -> bool:
    with Session(engine) as session:
        statm = select(func.count()).select_from(WaterPrint).where(WaterPrint.name == name)
        result = session.exec(statm).one()
        if result > 0:
            return False
        else:
            return True


SessionDep = Annotated[Session, Depends(get_session)]

app = FastAPI()

origins = {
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/waterprint/")
def create_product(waterprint: WaterPrint, session:SessionDep):
    if name_exists(waterprint.name):
        session.add(waterprint)
        session.commit()
        session.refresh(waterprint)
        return waterprint
    else:
        return {"error":"Ce produit exists déjà"}

@app.get("/waterprint/")
def read_products(session: SessionDep, offset: int = 0,limit: Annotated[int, Query(le=100)] = 100) -> list[WaterPrint]:
    waterprints = session.exec(select(WaterPrint).offset(offset).limit(limit)).all()
    return waterprints

@app.get("/waterprint/{waterprint_id}")
def read_product(waterprint_id: int, session: SessionDep):
    waterprint = session.get(WaterPrint,waterprint_id)
    if not waterprint:
        raise HTTPException(status_code=404, detail="Waterprint not found")
    return waterprint
    
