from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.users.services import UserService
from src.users.schemas import UserRegisterModel, UserUpdateModel, UserModel
from src.users.utils import generate_password_hash
from src.db.main import get_async_session
from src.users.models import User
import uuid

user_router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)
user_service = UserService()

@user_router.get("/all")
async def get_all_users( db: AsyncSession = Depends(get_async_session)):
    result = await user_service.get_all_users(db=db)
    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Don't have any user")
    return result

@user_router.get("/{user_id}")
async def get_user_by_id(user_id: str, db: AsyncSession = Depends(get_async_session)):
    user = await user_service.get_user_by_id(db=db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@user_router.post("/register")
async def create_user(user: UserRegisterModel, db: AsyncSession = Depends(get_async_session)):
    if await user_service.existed_user(db=db, email=user.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")
    return await user_service.create_user(db=db, user=user)
    

@user_router.delete("/{user_id}")
async def delete_user(user_id: str, db: AsyncSession = Depends(get_async_session)):
    return await user_service.delete_user(db=db, user_id=user_id)
    