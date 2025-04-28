from sqlalchemy.orm import Session
from ..db_models.patient import Patient
from typing import List
from ..db_models.patient import PatientNeedingTests as PatientNeedingTestsModel
from ..db_models.lab_tests import LabTest as LabTestModel
from ..db_models.admissions import Admission
from ..schemas import PaginatedResponse, PatientNeedingTests, AggregatedPatientInformation, LabTest


class PatientService:
    def __init__(self, db: Session):
        self.db = db

    def get_patients(self, page: int = 1, per_page: int = 10) -> PaginatedResponse[PatientNeedingTests]:
        """
        Get paginated list of patients needing tests
        """
        # Calculate offset
        offset = (page - 1) * per_page
        
        # Get total count
        total_count = self.db.query(PatientNeedingTestsModel).count()
        
        # Get paginated results
        patients = (
            self.db.query(PatientNeedingTestsModel)
            .order_by(PatientNeedingTestsModel.last_test_datetime.desc())
            .offset(offset)
            .limit(per_page)
            .all()
        )
        print(patients)
        return {
            "items": patients,
            "total_pages": (total_count + per_page - 1) // per_page
        }

    def get_patient(self, patient_id: int) -> Patient:
        """Get single patient by ID"""
        return self.db.query(Patient).filter(Patient.patient_id == patient_id).first()

    def get_patient_details(self, patient_id: str) -> AggregatedPatientInformation:
        """Get detailed patient information"""
        result = (
            self.db.query(Patient, Admission)
            .join(Admission, Patient.patient_id == Admission.patient_id)
            .filter(Patient.patient_id == patient_id)
            .first()
        )
        
        if not result:
            return None
            
        return AggregatedPatientInformation(
            patient_id=result.Patient.patient_id,
            first_name=result.Patient.first_name,
            last_name=result.Patient.last_name,
            date_of_birth=result.Patient.date_of_birth,
            department=result.Admission.department,
            room_number=result.Admission.room_number,
            admission_date=result.Admission.admission_date,
            admission_time=result.Admission.admission_time,
            hospitalization_case_number=result.Admission.hospitalization_case_number,
            primary_physician=result.Patient.primary_physician,
            insurance_provider=result.Patient.insurance_provider,
            blood_type=result.Patient.blood_type,
            allergies=result.Patient.allergies
        )

    def get_patient_tests(self, patient_id: str) -> List[LabTest]:
        """Get patient's test history"""
        return (
            self.db.query(LabTestModel)
            .filter(LabTestModel.patient_id == patient_id)
            .order_by(LabTestModel.order_date.desc(), LabTestModel.order_time.desc())
            .all()
        )
    