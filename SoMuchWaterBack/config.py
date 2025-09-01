import os

from pydantic_settings import BaseSettings, SettingsConfigDict

DOTENV = os.path.join(os.path.dirname(__file__), ".env")

class Settings(BaseSettings):
    client_id: str | None
    client_secret: str | None
    secret_key: str | None
    algorithm: str | None
    access_token_expire_minutes: int | None

    model_config = SettingsConfigDict(env_file=DOTENV)
