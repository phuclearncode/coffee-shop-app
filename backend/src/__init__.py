from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.db.main import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    print("Lifespan : Shutting down")

app = FastAPI(
    title="Coffee Shop API",
    description="API for Coffee Shop",
    lifespan=lifespan,
    )



