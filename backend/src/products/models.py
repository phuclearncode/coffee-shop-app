from sqlmodel import SQLModel, Field, Column
from datetime import datetime
import uuid
import sqlalchemy.dialects.postgresql as pg

class Product(SQLModel, table=True):
    __tablename__ = "products"
    product_id: uuid.UUID = Field(
        sa_column=Column(
            pg.UUID, primary_key=True, default=uuid.uuid4, nullable=False, info={"description": "Product ID" }
    ))
    name : str = Field(
        max_length=50,
    )
    description : str = Field(
        max_length=100,
    )
    image_url : str
    category : str
    created_at : datetime = Field( sa_column=Column(pg.TIMESTAMP(timezone=True), nullable=False, default=datetime.now()))
    updated_at : datetime = Field( sa_column=Column(pg.TIMESTAMP(timezone=True), nullable=True, default=datetime.now()))

    def __repr__(self):
        return f"Product(product_id={self.product_id}, name={self.name}, description={self.description}, image_url={self.image_url}, category={self.category})"
    