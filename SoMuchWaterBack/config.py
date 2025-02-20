from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    client_id: str
    client_secret: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    model_config = SettingsConfigDict(env_file=".env")
