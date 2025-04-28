from fastapi import Depends
from ..config.database import get_db
from ..services.lab_test import LabTestService
from ..services.patient import PatientService
from ..services.department import DepartmentService
from sqlalchemy.orm import Session

def get_patient_service(db: Session = Depends(get_db)) -> PatientService:
    return PatientService(db)

def get_lab_test_service(db: Session = Depends(get_db)) -> LabTestService:
    return LabTestService(db)

def get_department_service(db: Session = Depends(get_db)) -> DepartmentService:
    return DepartmentService(db)