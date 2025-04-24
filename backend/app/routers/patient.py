from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..db.database import get_db
from ..schemas.patient import Patient, PatientCreate
from ..services.patient import PatientService

router = APIRouter(
    prefix="/patients",
    tags=["patients"]
)

@router.get("", response_model=List[Patient])
def get_patients(db: Session = Depends(get_db)):
    """Get list of patients"""
    patient_service = PatientService(db)
    return patient_service.get_patients()

@router.get("/{patient_id}", response_model=Patient)
def get_patient(patient_id: int, db: Session = Depends(get_db)):
    """Get single patient by ID"""
    patient_service = PatientService(db)
    patient = patient_service.get_patient(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.post("", response_model=Patient, status_code=201)
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    """Create a new patient"""
    patient_service = PatientService(db)
    return patient_service.create_patient(patient) 