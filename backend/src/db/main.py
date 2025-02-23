from sqlmodel import create_engine, SQLModel
from sqlalchemy.ext.asyncio import AsyncEngine
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import sessionmaker
from beanie import init_beanie, WriteRules
from motor.motor_asyncio import AsyncIOMotorClient
from src.config import Config
from src.users.models import User
from src.payment.models import Payment
from src.orders.models import Order
from src.order_detail.models import OrderDetail
from src.product_variants.models import ProductVariant
from src.products.models import Product

MONGODB_URL = Config.MONGODB_URL
POSTGRE_URL = f"postgresql+asyncpg://{Config.POSTGRE_URL}"

client = AsyncIOMotorClient(MONGODB_URL)
async def init_mongo_db():
    """ Create the connection to the NoSQL db for chatbot """
    # Chố nào đã init connection đến db >> cái này
    db = client["coffee_shop"]
    collections = await db.list_collection_names()
    print(f"Connected to MongoDB! Collections: {collections}")
    # vây là đoạn nào đoạn nào mới là để init connectition đến db >> cái này để khởi tạo cái beanie
    await init_beanie(
        database=client["coffee_shop"],
        document_models=[]
    )

engine = AsyncEngine(create_engine(url=POSTGRE_URL, 
                                   echo=True))

async def init_postgre_db():
    """ Create the connection to the SQL db """
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
        print("Connected to PostgreSQL!")

