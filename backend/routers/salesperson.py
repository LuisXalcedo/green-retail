from typing import Annotated
from fastapi import APIRouter, HTTPException, status, Depends, Query
from odmantic.exceptions import DuplicateKeyError
from odmantic import ObjectId, query as q
import re

from ..models.salesperson import Salesperson, SalespersonSchema
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
    - **id**: int
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
    
    async with engine.session() as session:
        try:
            await session.save(salesperson)
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

@router.patch(
        "/{id}", 
        response_model=Salesperson, 
        status_code=status.HTTP_200_OK,
        summary="Update a salesperson",
        response_description="The updated salesperson"
        )
async def update_salesperson_by_id(
    id: ObjectId, 
    patch: SalespersonSchema,
    # salesperson: Salesperson, 
    current_user: Salesperson = Depends(get_current_active_user)
    ):
    """
    Update a salesperson by its id
    """
    #Considera hacer esta configuración una vez al iniciar tu aplicación.
    await engine.configure_database([Salesperson]) 
    
    try:
        salesperson = await engine.find_one(Salesperson, Salesperson.id == id)
        if not salesperson:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Salesperson not found")

        salesperson.model_update(patch, exclude_defaults=False)
        await engine.save(salesperson)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    return salesperson

@router.get(
        "/", 
        response_model=list[Salesperson], 
        status_code=status.HTTP_200_OK, 
        summary="Get all salespersons", 
        response_description="The salespersons")
async def get_all_salespersons(
    query: Annotated[str | None, Query(max_length=20)] = None,
    current_user: Salesperson = Depends(get_current_active_user)
    ):
    """
    Get all salespersons
    """
    #Considera hacer esta configuración una vez al iniciar tu aplicación.
    await engine.configure_database([Salesperson]) 
    
    try:
        if query:
            pattern = re.compile(f"^{query}", re.IGNORECASE)
            try:
                id_query = int(query)
            except ValueError:
                id_query = None

            salespersons = await engine.find(
                Salesperson, q.or_(
                q.match(Salesperson.name, pattern),
                q.match(Salesperson.name2, pattern),
                q.eq(Salesperson.id_employee, id_query),
                # q.match(Salesperson.phone, pattern),
                # q.match(Salesperson.email, pattern),
                )
            )
        else:
            salespersons = await engine.find(Salesperson)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        
    return salespersons

@router.get("/count", response_model=int, status_code=status.HTTP_200_OK, summary="Get the number of salespersons")
async def get_salespersons_count(
    current_user: Salesperson = Depends(get_current_active_user)
    ):
    """
    Get the number of salespersons
    """
    #Considera hacer esta configuración una vez al iniciar tu aplicación.
    await engine.configure_database([Salesperson]) 
    
    try:
        count = await engine.count(Salesperson)
        return count
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    return count

@router.get(
        "/{id}", 
        response_model=Salesperson, 
        status_code=status.HTTP_200_OK, 
        summary="Get a salesperson by its id", 
        response_description="The salesperson")
async def get_salesperson_by_id(
    id: ObjectId, 
    current_user: Salesperson = Depends(get_current_active_user) 
    ):
    """
    Get a salesperson by its id
    """
    #Considera hacer esta configuración una vez al iniciar tu aplicación.
    await engine.configure_database([Salesperson]) 
    
    try:
        salesperson = await engine.find_one(Salesperson, Salesperson.id == id)
        if not salesperson:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Salesperson not found")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    return salesperson

@router.delete(
        "/{id}", 
        status_code=status.HTTP_204_NO_CONTENT, 
        summary="Delete a salesperson")
async def delete_salesperson_by_id(
    id: ObjectId, 
    current_user: Salesperson = Depends(get_current_active_user)
    ):
    """
    Delete a salesperson by its id
    """
    #Considera hacer esta configuración una vez al iniciar tu aplicación.
    await engine.configure_database([Salesperson]) 
    
    try:
        salesperson = await engine.find_one(Salesperson, Salesperson.id == id)
        if not salesperson:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Salesperson not found")

        await engine.delete(salesperson)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    return salesperson