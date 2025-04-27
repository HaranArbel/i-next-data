# import pytest
# from unittest.mock import Mock
# from fastapi.testclient import TestClient
# from datetime import date, datetime, timedelta
# from src.app import app
# from src.dependencies import get_patient_service

# @pytest.fixture
# def mock_patient_data():
#     """Mock data for patient details"""
#     return {
#         "patient_id": 1100406,
#         "first_name": "Brian",  # Updated to match actual data
#         "last_name": "Patient",
#         "date_of_birth": date(1990, 1, 1).isoformat(),
#         "department": "Cardiology",
#         "room_number": "101",
#         "admission_date": (datetime.now() - timedelta(days=3)).isoformat(),
#         "admission_time": datetime.now().time().isoformat(),
#         "primary_physician": "Dr. Smith",
#         "insurance_provider": "TestInsurance",
#         "blood_type": "A+",
#         "allergies": "None"
#     }

# @pytest.fixture
# def mock_service(mock_patient_data):
#     mock = Mock()
#     mock.get_patient_details.return_value = mock_patient_data
#     return mock

# @pytest.fixture
# def client(mock_service):
#     app.dependency_overrides[get_patient_service] = lambda: mock_service
#     client = TestClient(app)
#     yield client
#     app.dependency_overrides.clear()

# def test_get_patient_by_id(client, mock_patient_data):
#     """Test get patient by ID endpoint"""
#     # Test successful patient retrieval
#     response = client.get(f"/patients/{mock_patient_data['patient_id']}")
#     assert response.status_code == 200
#     patient = response.json()
    
#     # Verify patient details
#     assert patient["patient_id"] == mock_patient_data["patient_id"]
#     assert patient["first_name"] == mock_patient_data["first_name"]
#     assert patient["last_name"] == mock_patient_data["last_name"]
#     assert patient["department"] == mock_patient_data["department"]
#     assert patient["room_number"] == mock_patient_data["room_number"]
#     assert patient["primary_physician"] == mock_patient_data["primary_physician"]
#     assert patient["insurance_provider"] == mock_patient_data["insurance_provider"]
#     assert patient["blood_type"] == mock_patient_data["blood_type"]
#     assert patient["allergies"] == mock_patient_data["allergies"]

#     # Test non-existent patient
#     response = client.get("/patients/99999")
#     assert response.status_code == 404
    
#     # Test invalid patient ID format
#     response = client.get("/patients/invalid")
#     assert response.status_code == 422