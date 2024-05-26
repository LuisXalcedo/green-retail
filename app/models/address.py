from odmantic import  Field, EmbeddedModel

from typing import Optional

class Address(EmbeddedModel):
    id_address: Optional[str] = Field(max_length=50, default="billing", unique=True)
    address: Optional[str] = Field(max_length=100, default=None)
    address2: Optional[str] = Field(max_length=100, default=None)
    country: Optional[str] = Field(max_length=50, default=None)
    city: Optional[str] = Field(max_length=50, default=None)
    state: Optional[str] = Field(max_length=50, default=None)
    zip_code: Optional[str] = Field(max_length=20, default=None)