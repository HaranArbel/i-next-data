from fastapi import APIRouter, HTTPException, Depends, Path
from typing import List
from ..schemas import PatientDetail, PatientNeedingTests, LabTest, PaginatedResponse
from ..services.patient import PatientService, get_patient_service

router = APIRouter(prefix="/patients", tags=["patients"])

@router.get("/need_tests", response_model=PaginatedResponse[PatientNeedingTests])
async def get_patients(page: int, service: PatientService = Depends(get_patient_service)):
    """Get a list of patients who need tests (dashboard view)"""
    try:
        return service.get_patients(page)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{patient_id}", response_model=PatientDetail)
async def get_patient_details(
    patient_id: int = Path(..., title="The ID of the patient to get"),
    service: PatientService = Depends(get_patient_service)
):
    """Get detailed information about a specific patient by patient_id"""
    try:
        result = service.get_patient_details(patient_id)
        if not result:
            raise HTTPException(status_code=404, detail="Patient not found")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{patient_id}/tests", response_model=List[LabTest])
async def get_patient_tests(
    patient_id: int = Path(..., title="The ID of the patient to get tests for"),
    service: PatientService = Depends(get_patient_service)
):
    try:
        result = service.get_patient_tests(patient_id)
        if result is None:
            raise HTTPException(status_code=404, detail="Patient not found")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))