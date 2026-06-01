import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME:str
    ENVIROMENT:str="production"

    # Scan for .env file
    model_config = SettingsConfigDict(
        env_file=".env", 
        env_file_encoding="utf-8",
        extra="ignore" # Ignores server provided
    )

# Creatse object
settings = Settings()