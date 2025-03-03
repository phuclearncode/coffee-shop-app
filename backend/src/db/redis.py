import aioredis
from src.config import Config

redis = aioredis.from_url(Config.REDIS_URL, encoding="utf-8", decode_responses=True)

async def add_jti_to_blacklist(jti: str):
    # store key vale
    await redis.set(name = jti, value ="blacklisted", ex=60 * 60)

async def check_jti_in_blacklist(jti: str):
    return await redis.exists(jti)