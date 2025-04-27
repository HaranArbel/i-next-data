from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from ..db.database import Base

class LabTest(Base):
    __tablename__ = "lab_tests"

    test_id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey("patients.patient_id"))
    test_name = Column(String)
    order_date = Column(Date)
    order_time = Column(Time)
    ordering_physician = Column(String)
    