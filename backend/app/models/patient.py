from sqlalchemy import Column, Integer, String, Date
from ..db.database import Base

class Patient(Base):
    __tablename__ = "patients"

    patient_id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    date_of_birth = Column(Date)
    primary_physician = Column(String)
    insurance_provider = Column(String)
    blood_type = Column(String)
    allergies = Column(String) 

