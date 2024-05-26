from pydantic import EmailStr as Email

from typing import Optional, Union

from odmantic import Model, Field, Index
from odmantic.query import asc, desc

from datetime import datetime

from ..models.address import Address

class Salesperson(Model):
    name: str = Field(max_length=50, index=True)
    name2: str = Field(max_length=50)
    id_employee: int = Field(unique=True)
    commission: float = Field(ge=0, le=100, default=0.0)
    address: Address
    phone: Optional[str] = None
    email: Union[Email, str] 
    bloqued: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    model_config = {
        "collection": "salespersons",
        "parse_doc_with_default_factories": True,
        "indexes": lambda: [
            Index(Salesperson.name, asc(Salesperson.id_employee), name="name_id_employee_idx")
            ]
    }
    