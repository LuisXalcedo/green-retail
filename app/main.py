from fastapi import FastAPI # type: ignore

from .routers import salesperson

app = FastAPI()

app.include_router(salesperson.router)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

