from fastapi import APIRouter, HTTPException, status, Depends
from odmantic.exceptions import DuplicateKeyError

from ..models.salesperson import Salesperson
from ..database.database import engine
from ..utils.tags import Tags
from ..dependencies import get_current_active_user



router = APIRouter(
    prefix="/salesperson", 
    tags=[Tags.salespersons],
    responses={status.HTTP_404_NOT_FOUND: {"description": "Not found"}}
    )

@router.put(
        "/", 
        response_model=Salesperson, 
        status_code=status.HTTP_201_CREATED,
        summary="Create a new salesperson",
        response_description="The created salesperson"
        )
async def create_salesperson(
    salesperson: Salesperson, 
    current_user: Salesperson = Depends(get_current_active_user)
    ):
    """
    Create a new salesperson with all information:
    - **name**: str
    - **name2**: str
    - **id_employee**: int
    - **commission**: float
    - **address**: Address
    - **phone**: str
    - **email**: Email
    - **bloqued**: bool
    - **created_at**: datetime
    - **updated_at**: datetime
    """

    #Considera hacer esta configuración una vez al iniciar tu aplicación.
    await engine.configure_database([Salesperson]) 
    
    try:
        await engine.save(salesperson)
    except DuplicateKeyError as e:
        # Esta excepción se lanza cuando se viola una restricción de integridad, como un valor duplicado en una columna única
        # El mensaje de error de MongoDB incluye el campo duplicado
        field = str(e).split("index: ")[1].split(" dup key")[0]
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"The field '{field}' is duplicated."
            )
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    return salesperson
