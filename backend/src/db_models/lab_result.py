from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from ..config.database import Base

class LabResult(Base):
    __tablename__ = "lab_results"

    test_id = Column(Integer, ForeignKey("lab_tests.test_id"), primary_key=True)
    result_value = Column()
    result_unit = Column(String)
    reference_range = Column(String)
    result_status = Column(String)
    performed_date = Column(Date)
    performed_time = Column(Time)
    reviewing_physician = Column(String)