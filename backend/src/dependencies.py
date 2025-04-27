from fastapi import Depends
from sqlalchemy.orm import Session
from .db.database import get_db
from .services.patient import PatientService, PatientServiceBase

def get_patient_service(db: Session = Depends(get_db)) -> PatientServiceBase:
    return PatientService(db) 