from sqlalchemy import Column, Integer, String, Date, Time, DateTime, Interval
from ..db.database import Base

class PatientNeedingTests(Base):
    __tablename__ = "patients_needing_tests"
    
    patient_id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    admission_date = Column(Date)
    admission_time = Column(Time)
    department = Column(String)
    room_number = Column(String)
    time_since_admission = Column(Interval)
    last_test_datetime = Column(DateTime, nullable=True)
    test_status = Column(String) 