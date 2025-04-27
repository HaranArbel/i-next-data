from pydantic import BaseModel
from datetime import time, date

class LabResult(BaseModel):
    # model_config = ConfigDict(from_attributes=True)
    
    test_id: int
    result_value: float | None = None
    result_unit: str | None = None
    reference_range: str | None = None
    result_status: str | None = None
    performed_date: date | None = None
    performed_time: time | None = None
    reviewing_physician: str | None = None

    class Config:
        from_attributes = True 