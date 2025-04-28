from datetime import date, datetime, time, timedelta
from pydantic import BaseModel
from typing import List, Optional

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    primary_physician: str | None = None
    insurance_provider: str | None = None
    blood_type: str | None = None
    allergies: str | None = None

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    pass

class AggregatedPatientInformation(BaseModel):    
    patient_id: int
    first_name: str
    last_name: str
    date_of_birth: date
    department: str
    room_number: str
    admission_date: datetime
    admission_time: time
    hospitalization_case_number: int
    primary_physician: Optional[str] = None
    insurance_provider: Optional[str] = None
    blood_type: Optional[str] = None
    allergies: Optional[str] = None

class PatientNeedingTests(BaseModel):    
    patient_id: int
    first_name: str
    last_name: str
    hospitalization_case_number: int
    admission_date: datetime
    admission_time: time
    department: str
    room_number: str
    time_since_admission: timedelta
    last_test_datetime: Optional[datetime] = None
    test_name: Optional[str] = None
    primary_physician: Optional[str] = None 

class PaginatedResponse[T](BaseModel):
    items: List[T]
    total_pages: int
