from sqlmodel import Field, SQLModel, Column
from datetime import datetime
import uuid
import sqlalchemy.dialects.postgresql as pg

class Payment (SQLModel, table=True):
    __tablename__ = "payments"
    payment_id: uuid.UUID = Field(sa_column=Column(pg.UUID, primary_key=True, default=uuid.uuid4, nullable=False, info={"description": "Payment ID" }))
    order_id: uuid.UUID = Field(default=None, foreign_key="orders.order_id")
    payment_status : bool
    payment_method : str
    payment_date : datetime 

    def __repr__(self) -> str:
        return f"Payment(payment_id={self.payment_id}, order_id={self.order_id}, payment_status={self.payment_status}, payment_method={self.payment_method}, payment_date={self.payment_date})"