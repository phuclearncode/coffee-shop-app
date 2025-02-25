from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.db.main import init_postgre_db, init_mongo_db
from src.users.routes import user_router
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_postgre_db()
    yield
    print("Lifespan : Shutting down")

app = FastAPI(
    title="Coffee Shop API",
    description="API for Coffee Shop",
    lifespan=lifespan,
    )

app.include_router(user_router)



