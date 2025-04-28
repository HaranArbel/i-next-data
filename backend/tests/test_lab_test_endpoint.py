

def test_get_lab_result(client):
    response = client.get("/tests/1/result")
    assert response.status_code == 200
    assert response.json() == {
        "test_id": 1,
        "result_value": 5.6,
        "result_unit": "mg/dL",
        "reference_range": "4.0-6.0",
        "result_status": "Normal",
        "performed_date": "2023-01-01",
        "performed_time": "09:00:00",
        "reviewing_physician": "Dr. House"
    }

def test_get_lab_result_not_found(client):
    response = client.get("/tests/999/result")
    assert response.status_code == 404
    assert response.json() == {"detail": "Test result not found"}
