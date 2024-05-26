from fastapi import APIRouter

from odmantic import AIOEngine

from ..models.salesperson import Salesperson
from ..database.database import engine



router = APIRouter(
    prefix="/salesperson", 
    tags=["salesperson"],
    responses={404: {"description": "Not found"}}
    )

@router.put("/", response_model=Salesperson)
async def create_salesperson(salesperson: Salesperson):
    await engine.configure_database([Salesperson])
    
    try:
        await engine.save(salesperson)
    except Exception as e:
        print(e)
        #return {"error": str(e)}

    return salesperson
    
    