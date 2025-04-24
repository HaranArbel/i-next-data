from fastapi import APIRouter, Depends
from typing import List
from ..schemas.patient_monitoring import PatientNeedingTests
from ..services.monitoring import MonitoringServiceBase
from ..dependencies import get_monitoring_service

router = APIRouter(
    prefix="/monitoring",
    tags=["monitoring"]
)

@router.get("/needing-tests", response_model=List[PatientNeedingTests])
def get_patients_needing_tests(
    monitoring_service: MonitoringServiceBase = Depends(get_monitoring_service)
):
    """Get list of patients who need tests based on monitoring criteria"""
    return monitoring_service.get_patients_needing_tests() 