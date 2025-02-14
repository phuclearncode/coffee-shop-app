from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    MONGODB_URL: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore" 
        )
    
Config = Settings()