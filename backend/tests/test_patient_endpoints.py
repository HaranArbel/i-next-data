from src.app import app

def test_get_patient_details(client):
    response = client.get("/patients/1")
    assert response.status_code == 200
    assert response.json() == {
        "patient_id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "date_of_birth": "1980-01-01",
        "department": "ER",
        "room_number": "101",
        "admission_date": "2023-01-01T00:00:00",
        "admission_time": "08:00:00",
        "hospitalization_case_number": 123,
        "primary_physician": "Dr. Smith",
        "insurance_provider": "ProviderX",
        "blood_type": "A+",
        "allergies": "None"
    }

def test_get_patient_details_not_found(client):
    response = client.get("/patients/999")
    print(response.json())
    assert response.status_code == 404
    assert response.json() == {"detail": "Patient not found"}

def test_get_patient_tests(client):
    response = client.get("/patients/1/tests")
    print(response.json())
    assert response.status_code == 200
    assert response.json() == [
        {
            "test_id": 1,
            "patient_id": 1,
            "test_name": "Blood Test",
            "order_date": "2023-01-01",
            "order_time": "07:00:00",
            "ordering_physician": "Dr. Smith"
        }
    ]

def test_get_patient_tests_not_found(client):
    response = client.get("/patients/999/tests")
    print(response.json())
    assert response.status_code == 404
    assert response.json() == {"detail": "Patient not found"}