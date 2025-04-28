import pytest
from fastapi.testclient import TestClient
from src.app import app
from src.services.dependencies import get_patient_service, get_lab_test_service

class TestLabTestService:
    def get_test_result(self, test_id: int):
        if test_id == 1:
            return {
                "test_id": 1,
                "result_value": 5.6,
                "result_unit": "mg/dL",
                "reference_range": "4.0-6.0",
                "result_status": "Normal",
                "performed_date": "2023-01-01",
                "performed_time": "09:00:00",
                "reviewing_physician": "Dr. House"
            }
        else:
            return None


class TestPatientService:
    def get_patient_details(self, patient_id: int):
        if patient_id == 1:
            return {
                "patient_id": 1,
                "first_name": "John",
                "last_name": "Doe",
                "date_of_birth": "1980-01-01",
                "department": "ER",
                "room_number": "101",
                "admission_date": "2023-01-01",
                "admission_time": "08:00:00",
                "hospitalization_case_number": 123,
                "primary_physician": "Dr. Smith",
                "insurance_provider": "ProviderX",
                "blood_type": "A+",
                "allergies": "None"
            }
        else:
            return None
        
    def get_patient_tests(self, patient_id: int):
        if patient_id == 1:
            return [
                {
                    "test_id": 1,
                    "patient_id": 1,
                    "test_name": "Blood Test",
                    "test_date": "2023-01-01",
                    "test_time": "08:00:00",
                    "order_date": "2023-01-01",
                    "order_time": "07:00:00",
                    "ordering_physician": "Dr. Smith",
                    "test_result": "Normal"
                }
            ]
        else:
            return None

@pytest.fixture(autouse=True)
def override_lab_test_service():
    def _override_get_lab_test_service():
        return TestLabTestService()
    app.dependency_overrides[get_lab_test_service] = _override_get_lab_test_service
    yield
    app.dependency_overrides.pop(get_lab_test_service, None)

@pytest.fixture(autouse=True)
def override_patient_service():
    def _override_get_patient_service():
        return TestPatientService()
    app.dependency_overrides[get_patient_service] = _override_get_patient_service
    yield
    app.dependency_overrides.clear()

@pytest.fixture
def client():
    return TestClient(app)
