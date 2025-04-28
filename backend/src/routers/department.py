from fastapi import APIRouter, Depends
from ..services.department import DepartmentService
from ..services.dependencies import get_department_service
from typing import List
router = APIRouter(prefix="/departments", tags=["departments"])

@router.get("/", response_model=List[str])
async def get_departments(service: DepartmentService = Depends(get_department_service)):
    return service.get_all_departments()