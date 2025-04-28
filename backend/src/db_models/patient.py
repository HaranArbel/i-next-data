from sqlalchemy import Column, Integer, String, Date, DateTime, Time, Interval
from ..config.database import Base

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

class PatientNeedingTests(Base):
    __tablename__ = 'patients_needing_tests'
    
    patient_id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    hospitalization_case_number = Column(Integer)
    admission_date = Column(DateTime)
    admission_time = Column(Time)
    department = Column(String)
    room_number = Column(String)
    time_since_admission = Column(Interval)
    last_test_datetime = Column(DateTime, nullable=True)
    test_name = Column(String, nullable=True)
    primary_physician = Column(String, nullable=True)

