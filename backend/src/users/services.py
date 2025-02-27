from sqlmodel.ext.asyncio.session import AsyncSession
from src.users.models import User
from src.users.schemas import UserRegisterModel, UserUpdateModel, UserModel
from sqlmodel import select
import uuid
from src.users.utils import generate_password_hash

class UserService:
    """ This class provides methods for user services """
    async def get_all_users(self, db: AsyncSession):
        result = await db.execute(select(User))
        all_users = result.scalars().all()
        if result is None:
            return None
        return all_users
    
    async def get_user_by_id(self,db: AsyncSession, user_id: str):
        result = await db.execute(select(User).where(User.user_id == user_id))
# nếu chỉ có mỗi result thì result sẽ là 1 tuple : $<sqlalchemy.engine.result.ChunkedIteratorResult object at 0x00000197D0EC3F10>
# => gây lỗi vì đây là 1 đối tượng chứ không phải dữ liệu
# result là 1 iterator chứa các dòng kết quả, nếu có nhiều thì là tuple
        user = result.scalars().first()
# schalars () giúp trích xuất dữ liệu từ iterator theo đúng kiểu mong muốn (trả về list thay vì tuple).
        if result is None:
            return None
        return user
    
    async def get_user_by_email(self,db: AsyncSession, email: str):
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalars().first()
        if result is None:
            return None
        return user
    # scalars().first() for what??

    async def existed_user(self,db: AsyncSession, email: str):
        result = await db.execute(select(User).where(User.email == email))
        if result.one_or_none():
            return True
        return False
    
    async def create_user(self,db: AsyncSession, user: UserRegisterModel):
        user.hash_password = generate_password_hash(user.hash_password)
        new_user = User(**user.model_dump())
        
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        return {"message": "User created", "user": new_user}
    
    async def update_user(self,db: AsyncSession, user_id: str, user: UserUpdateModel):
        result = await db.execute(select(User).where(User.user_id == user_id))
        db_user = result.one_or_none()
        if db_user:
            update_data = user.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_user, key, value)
            db.add(db_user)
            await db.commit()
            await db.refresh(db_user)
            return db_user
        
    async def delete_user(self,db: AsyncSession, user_id: str):
        result = await db.execute(select(User).where(User.user_id == user_id))
# sau khi lấy kết quả result sẽ đóng 
        user_delete = result.scalars().first()
        if user_delete:
# nếu ở đây dùng result.one_or_none() thì sẽ ko được vì result object is closed
            await db.delete(user_delete)
            await db.commit()
            return {"message": "User deleted"}
        else :
            return {"message": "User not exists"}

        

