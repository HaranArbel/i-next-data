from fastapi import APIRouter, HTTPException, Depends, Path
from ..schemas import LabResult
from ..services.dependencies import get_lab_test_service
from ..services.lab_test import LabTestService

router = APIRouter(prefix="/tests", tags=["lab_tests"])

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