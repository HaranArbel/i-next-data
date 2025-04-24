from sqlalchemy.orm import Session
from ..models.patient import Patient
from ..schemas.patient import PatientCreate
from typing import List

class PatientService:
    def __init__(self, db: Session):
        self.db = db

    def create_patient(self, patient: PatientCreate) -> Patient:
        """Create a new patient"""
        db_patient = Patient(**patient.model_dump())
        self.db.add(db_patient)
        self.db.commit()
        self.db.refresh(db_patient)
        return db_patient

    def get_patients(self) -> List[Patient]:
        """Get list of patients with limit"""
        return self.db.query(Patient).all()

    def get_patient(self, patient_id: int) -> Patient:
        """Get single patient by ID"""
        return self.db.query(Patient).filter(Patient.patient_id == patient_id).first() 