from fastapi import APIRouter

from .routers import salesperson, token, user

api_router = APIRouter()
api_router.include_router(salesperson.router)
api_router.include_router(token.router)
api_router.include_router(user.router)
