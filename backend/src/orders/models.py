from sqlmodel import Field, SQLModel, Column
from datetime import datetime
import uuid
import sqlalchemy.dialects.postgresql as pg

class Order(SQLModel, table=True):
    __tablename__ = "orders"
    order_id: uuid.UUID = Field(sa_column=Column(pg.UUID, primary_key=True, default=uuid.uuid4, nullable=False, info={"description": "Order ID" }))
    user_id: uuid.UUID = Field(default=None, foreign_key="users.user_id")
    status : str
    total_price : float
    created_at : datetime = Field( sa_column=Column(pg.TIMESTAMP(timezone=True), nullable=False, default=datetime.now()))
    updated_at : datetime = Field( sa_column=Column(pg.TIMESTAMP(timezone=True), nullable=True, default=datetime.now()))