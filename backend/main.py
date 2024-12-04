from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import api_router

app = FastAPI()

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
async def read_root():
    return {"message": "Hello Luis"}
