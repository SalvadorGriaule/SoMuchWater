from functools import lru_cache
from sqlmodel import create_engine
from . import config
 
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

@lru_cache
def get_settings():
    return config.Settings()