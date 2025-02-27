from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.users.services import UserService
from src.users.schemas import UserRegisterModel, UserUpdateModel, UserModel, UserLoginModel
from src.users.utils import generate_password_hash, verify_password, decode_access_token, create_access_token
from src.db.main import get_async_session
from src.users.models import User
import uuid
from datetime import timedelta
from fastapi.responses import JSONResponse

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

# should have rbac or user can get data of each other
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

@user_router.post("/login")
async def login(user_login: UserLoginModel, db: AsyncSession = Depends(get_async_session)):
    email = user_login.email
    password = user_login.password

    user = await user_service.get_user_by_email(db=db, email=email)
    if user is not None:
        password_valid = verify_password(password, user.hash_password)
        if password_valid:
            access_token = create_access_token(user_data= {
# should i have to convert the type uuid to string??
 # Object of type UUID is not JSON serializable - error
                "user_id" : str(user.user_id),
                "email" : user.email   
            })
            refresh_token = create_access_token(
                 # Object of type UUID is not JSON serializable - error
                user_data= {"user_id" : str(user.user_id), "email" : user.email}, refresh_token=True, expires_delta=timedelta(days=30))
            # what if this return dont have JSONResponse stuff?
            return JSONResponse(content={"message": "Login successfully","access_token": access_token, "refresh_token": refresh_token, 
                                "user": {
                                    "user_id" : str(user.user_id),
            # Object of type UUID is not JSON serializable - error
                                    "email" : user.email}}
                                    )

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")