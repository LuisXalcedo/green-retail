from odmantic import  Field, EmbeddedModel

from typing import Union, Optional

class Address(EmbeddedModel):
    id_address: Union[str,None] = Field(max_length=50, default="billing", unique=True)
    address: Union[str,None] = Field(max_length=100, default=None)
    address2: Union[str,None] = Field(max_length=100, default=None)
    country: Union[str,None] = Field(max_length=50, default=None)
    city: Union[str,None] = Field(max_length=50, default=None)
    state: Union[str,None] = Field(max_length=50, default=None)
    zip_code: Union[str,None] = Field(max_length=20, default=None)

class AddressSchema(EmbeddedModel):
    address: Optional[str] = None
    address2: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None