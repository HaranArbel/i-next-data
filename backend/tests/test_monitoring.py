import pytest
from fastapi.testclient import TestClient
from datetime import date, datetime, timedelta
from app.schemas.patient_monitoring import PatientNeedingTests
from app.services.monitoring import MonitoringServiceBase
from app.dependencies import get_monitoring_service
from app.main import app  # Also needed for dependency_overrides

@pytest.fixture
def mock_monitoring_data():
    """Mock data for monitoring tests"""
    return [
        PatientNeedingTests(
            patient_id=1,
            first_name="Test",
            last_name="Patient",
            admission_date=date.today() - timedelta(days=3),
            admission_time=datetime.now().time(),
            department="Test Ward",
            room_number="101",
            time_since_admission=timedelta(days=3),
            last_test_datetime=datetime.now() - timedelta(days=3),
            test_status="Test needed"
        )
    ]

class MockMonitoringService(MonitoringServiceBase):
    def __init__(self, mock_data):
        self.mock_data = mock_data

    def get_patients_needing_tests(self):
        return self.mock_data

def test_get_patients_needing_tests(client: TestClient, mock_monitoring_data):
    """Test monitoring endpoint with mocked service"""
    app.dependency_overrides[get_monitoring_service] = lambda: MockMonitoringService(mock_monitoring_data)
    
    response = client.get("/monitoring/needing-tests")
    assert response.status_code == 200
    patients = response.json()
    
    assert len(patients) > 0
    patient = patients[0]
    assert patient["patient_id"] == 1
    assert patient["first_name"] == "Test"
    assert patient["test_status"] == "Test needed"
    assert "time_since_admission" in patient
    assert "last_test_datetime" in patient

    # Clean up
    app.dependency_overrides.clear()