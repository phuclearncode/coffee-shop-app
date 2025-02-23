from sqlmodel import SQLModel, Field, Column
import sqlalchemy.dialects.postgresql as pg
import uuid
from datetime import datetime

class User(SQLModel, table=True):
    __tablename__ = "users"
    user_id: uuid.UUID = Field(
        sa_column=Column(
            pg.UUID, primary_key=True, default=uuid.uuid4, nullable=False, info={"description": "User ID" }
        )
    )
    first_name : str = Field(
        max_length=50,
    )
    last_name : str = Field(
        max_length=50,
    )
    email : str = Field(
        max_length=100,
    )
    phone_number : str = Field(
        max_length=20,
    )
    address : str = Field(
        max_length=100,
    )
    username : str = Field(
        max_length=50,
    )
    hash_password : str = Field(
        max_length=100,
    )
    role: str = Field(
        max_length=20,
    )
    is_verified: bool = Field(default=False)
    created_at: datetime = Field(
        sa_column=Column(
            pg.TIMESTAMP, default=datetime.now(), nullable=False
        )
    )
    updated_at: datetime = Field(
        sa_column=Column(
            pg.TIMESTAMP, default=datetime.now(), nullable=False
        )
    )

    def __repr__(self):
        return f"User(uid={self.user_id},first_name={self.first_name},last_name={self.last_name},email={self.email},phone_number={self.phone_number},address={self.address}, username={self.username})"
