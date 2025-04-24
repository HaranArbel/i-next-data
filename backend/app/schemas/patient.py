from datetime import date
from pydantic import BaseModel, ConfigDict

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