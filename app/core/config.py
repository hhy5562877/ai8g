from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    CLAUDE_API_KEY: str
    CLAUDE_BASE_URL: str

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings() 