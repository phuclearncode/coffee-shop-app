from pydantic import BaseModel
from pydantic.fields import Field
from datetime import datetime
import uuid
from sqlmodel import Field, SQLModel, Column
import sqlalchemy.dialects.postgresql as pg

class UserModel(BaseModel):
    user_id: uuid.UUID = Field(sa_column=Column(pg.UUID, primary_key=True, default=uuid.uuid4, nullable=False, info={"description": "User ID" }))
    first_name : str = Field(max_length=50)
    last_name : str = Field(max_length=50)
    email : str = Field(max_length=100)
    phone_number : str = Field(max_length=20)
    address : str = Field(max_length=100)
    username : str = Field(max_length=50)
    hash_password : str = Field(max_length=100)
    role: str = Field(max_length=50, default="user", nullable=False)
    is_verified : bool = Field(default=False, nullable=False)
    created_at : datetime = Field( sa_column=Column(pg.TIMESTAMP, nullable=False, default=datetime.now()))
    update_at : datetime = Field( sa_column=Column(pg.TIMESTAMP, nullable=True, default=datetime.now()))

class UserUpdateModel(BaseModel):
    first_name : str
    last_name : str
    email : str
    phone_number : str
    address : str
    username : str
    role: str

class UserLoginModel(BaseModel):
    email : str = Field(max_length=100)
    password : str = Field(max_length=100)

class UserRegisterModel(BaseModel):
    first_name : str = Field(max_length=50, nullable=True)
    last_name : str = Field(max_length=50, nullable=True)
    email : str = Field(max_length=100)
    phone_number : str = Field(max_length=20)
    address : str = Field(max_length=100)
    username : str = Field(max_length=50)
    hash_password : str = Field(max_length=100)