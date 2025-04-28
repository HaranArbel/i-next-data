from pydantic import BaseModel
from pydantic.config import ConfigDict
from datetime import date, time

class LabTest(BaseModel):    
    test_id: int
    patient_id: int
    test_name: str
    order_date: date
    order_time: time
    ordering_physician: str
