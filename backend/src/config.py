from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # CORS Settings
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    
    # Database Settings (from your environment variables)
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_PORT: str

    class Config:
        env_file = ".env"

settings = Settings()