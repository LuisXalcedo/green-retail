from typing import Annotated

from fastapi import APIRouter, Depends

from ..dependencies import get_current_active_user
from ..models.user import User
from ..utils.tags import Tags

router = APIRouter(
    prefix="/users",
    tags=[Tags.users]
)

@router.get("/me", response_model=User)
async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user