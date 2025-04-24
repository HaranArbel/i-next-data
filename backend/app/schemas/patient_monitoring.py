from datetime import datetime, date, time, timedelta
from pydantic import BaseModel, ConfigDict

class PatientNeedingTests(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    patient_id: int
    first_name: str
    last_name: str
    admission_date: date
    admission_time: time
    department: str
    room_number: str
    time_since_admission: timedelta
    last_test_datetime: datetime | None
    test_status: str