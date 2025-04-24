from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from ..db.database import Base

class Admission(Base):
    __tablename__ = "admissions"

    hospitalization_case_number = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey("patients.patient_id"))
    admission_date = Column(Date)
    admission_time = Column(Time)
    release_date = Column(Date, nullable=True)
    release_time = Column(Time, nullable=True)
    department = Column(String)
    room_number = Column(String) 