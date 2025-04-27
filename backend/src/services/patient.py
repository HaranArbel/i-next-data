from abc import ABC, abstractmethod
from sqlalchemy.orm import Session
from ..models.patient import Patient
from ..schemas.patient import PatientCreate
from typing import List
from ..models.patient import PatientNeedingTests
from ..models.lab_tests import LabTest
from ..models.admissions import Admission
from ..schemas.patient import Patient as PatientSchema
from ..schemas.patient import PatientDetail, TestResult
from ..schemas.patient import PatientNeedingTests as PatientNeedingTestsSchema
from datetime import datetime

class PatientServiceBase(ABC):
    @abstractmethod
    def create_patient(self, patient: PatientCreate) -> Patient:
        pass

    @abstractmethod
    def get_patients(self) -> List[Patient]:
        pass

    @abstractmethod
    def get_patient(self, patient_id: int) -> Patient:
        pass

class PatientService(PatientServiceBase):
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
        """Get list of patients"""
        return self.db.query(Patient).all()

    def get_patient(self, patient_id: int) -> Patient:
        """Get single patient by ID"""
        return self.db.query(Patient).filter(Patient.patient_id == patient_id).first()

    def get_patients_needing_tests(self) -> List[PatientNeedingTestsSchema]:
        """Get list of patients who need tests using the database view"""
        return self.db.query(PatientNeedingTests).all()

    def get_patient_details(self, patient_id: str) -> PatientDetail:
        """Get detailed patient information"""
        result = (
            self.db.query(Patient, Admission)
            .join(Admission, Patient.patient_id == Admission.patient_id)
            .filter(Patient.patient_id == patient_id)
            .first()
        )
        
        if not result:
            return None
            
        return PatientDetail(
            patient_id=result.Patient.patient_id,
            first_name=result.Patient.first_name,
            last_name=result.Patient.last_name,
            date_of_birth=result.Patient.date_of_birth,
            department=result.Admission.department,
            room_number=result.Admission.room_number,
            admission_date=result.Admission.admission_date,
            admission_time=result.Admission.admission_time,
            primary_physician=result.Patient.primary_physician,
            insurance_provider=result.Patient.insurance_provider,
            blood_type=result.Patient.blood_type,
            allergies=result.Patient.allergies
        )

    def get_patient_tests(self, patient_id: str) -> List[TestResult]:
        """Get patient's test history"""
        tests = (
            self.db.query(LabTest)
            .filter(LabTest.patient_id == patient_id)
            .order_by(LabTest.order_date.desc(), LabTest.order_time.desc())
            .all()
        )
        
        return [
            TestResult(
                test_id=str(test.test_id),
                test_name=test.test_name,
                order_datetime=datetime.combine(test.order_date, test.order_time),
                ordering_physician=test.ordering_physician,
                result_status="Pending",
                result_value=None,
                result_unit=None,
                performed_datetime=None
            )
            for test in tests
        ] 