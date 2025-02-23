from sqlmodel import Field, SQLModel, Column
from typing import Optional
import uuid
import sqlalchemy.dialects.postgresql as pg

class ProductVariant(SQLModel, table=True):
    __tablename__ = "product_variants"
    variant_id: uuid.UUID = Field(sa_column=Column(pg.UUID, primary_key=True, default=uuid.uuid4, nullable=False, info={"description": "Product Variant ID" }))
    product_id : Optional[uuid.UUID] = Field(default=None, foreign_key="products.product_id")
    size : str
    quantity : int 
    price : float

    def __repr__(self):
        return f"ProductVariant(product_id={self.product_id}, size_id={self.size_id}, quantity={self.quantity}, price={self.price})"
