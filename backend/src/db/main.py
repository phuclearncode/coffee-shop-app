import asyncio
from beanie import init_beanie, WriteRules
from motor.motor_asyncio import AsyncIOMotorClient
from src.config import Config

MONGODB_URL = Config.MONGODB_URL

async def init_db():
    """ Create the connection to the db """
    # Chố nào đã init connection đến db >> cái này
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client["coffee_shop"]
    collections = await db.list_collection_names()
    print(f"Connected to MongoDB! Collections: {collections}")
    # vây là đoạn nào đoạn nào mới là để init connectition đến db >> cái này để khởi tạo cái beanie
    await init_beanie(
        database=client["coffee_shop"],
        document_models=[]
    )


