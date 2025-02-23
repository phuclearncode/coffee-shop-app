from sqlmodel import Field, SQLModel, Column
from datetime import datetime
import uuid
import sqlalchemy.dialects.postgresql as pg

class OrderDetail(SQLModel, table=True):
    __tablename__ = "order_details"
    order_id: uuid.UUID = Field(default=None, primary_key=True, foreign_key="orders.order_id")
    variant_id: uuid.UUID = Field(default=None, primary_key=True, foreign_key="product_variants.variant_id")
    quantity: int
    product_price: float

    def __repr__(self):
        return f"OrderDetail(order_id={self.order_id}, variant_id={self.variant_id}, quantity={self.quantity}, product_price={self.product_price})"