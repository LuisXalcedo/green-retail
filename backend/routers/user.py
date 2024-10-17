from typing import Annotated

from fastapi import APIRouter, Depends

from ..dependencies import get_current_active_user
from ..models.user import User, UserInDB
from ..utils.tags import Tags

router = APIRouter(prefix="/user", tags=[Tags.users])


@router.get("/me", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@router.get("/{mail}", response_model=UserInDB)
async def read_user_by_mail(mail: str):
    return {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
