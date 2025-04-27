from fastapi import APIRouter, HTTPException, Depends, Path
from typing import Optional
from sqlalchemy.orm import Session
from ..schemas import LabResult, LabTest
from ..services.lab_test import LabTestService
from ..db.database import get_db

router = APIRouter(prefix="/tests", tags=["lab_tests"])

def get_lab_test_service(db: Session = Depends(get_db)) -> LabTestService:
    return LabTestService(db)

@router.get("/{test_id}/result", response_model=LabResult)
async def get_test_result(
    test_id: int = Path(..., title="The ID of the test to get results for"),
    service: LabTestService = Depends(get_lab_test_service)
):
    """Get test result by test ID"""
    try:
        result = service.get_test_result(test_id)
        if result is None:
            raise HTTPException(status_code=404, detail="Test result not found")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 