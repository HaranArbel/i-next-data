from datetime import date, datetime, time, timedelta
from pydantic import BaseModel, ConfigDict
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

class Patient(PatientBase):
    model_config = ConfigDict(from_attributes=True)
    patient_id: int
    department: str
    room_number: str
    admission_date: date
    admission_time: time

class TestResult(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    test_id: int
    test_name: str
    order_datetime: datetime  # We'll combine order_date and order_time in the service
    ordering_physician: str
    result_status: Optional[str] = None
    result_value: Optional[str] = None
    result_unit: Optional[str] = None

class PatientDetail(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    patient_id: int
    first_name: str
    last_name: str
    date_of_birth: date
    department: str
    room_number: str
    admission_date: datetime
    admission_time: time
    primary_physician: Optional[str] = None
    insurance_provider: Optional[str] = None
    blood_type: Optional[str] = None
    allergies: Optional[str] = None

class PatientNeedingTests(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
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
