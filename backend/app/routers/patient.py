from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..schemas.patient import Patient, PatientCreate
from ..services.patient import PatientServiceBase
from ..dependencies import get_patient_service

router = APIRouter(
    prefix="/patients",
    tags=["patients"]
)

@router.get("", response_model=List[Patient])
def get_patients(
    patient_service: PatientServiceBase = Depends(get_patient_service)
):
    """Get list of patients"""
    return patient_service.get_patients()

@router.get("/{patient_id}", response_model=Patient)
def get_patient(
    patient_id: int,
    patient_service: PatientServiceBase = Depends(get_patient_service)
):
    """Get single patient by ID"""
    patient = patient_service.get_patient(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.post("", response_model=Patient, status_code=201)
def create_patient(
    patient: PatientCreate,
    patient_service: PatientServiceBase = Depends(get_patient_service)
):
    """Create a new patient"""
    return patient_service.create_patient(patient) 