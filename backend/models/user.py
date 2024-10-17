from pydantic import BaseModel, EmailStr as Email


class UserBase(BaseModel):
    username: str
    email: Email | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserIn(UserBase):
    password: str


class User(UserBase):
    pass


class UserInDB(UserBase):
    hashed_password: str
