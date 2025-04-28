from sqlalchemy.orm import Session
from ..models.lab_result import LabResult as LabResultModel
from ..schemas.lab_result import LabResult
from datetime import datetime, time, date
import math
from fastapi import Depends
from ..db.database import get_db

class LabTestService:
    def __init__(self, db: Session):
        self.db = db

    def get_test_result(self, test_id: int) -> LabResult:
        """Get test result by test ID"""
        result = (
            self.db.query(LabResultModel)
            .filter(LabResultModel.test_id == test_id)
            .first()
        )
        
        if not result:
            return None

        # Convert NaN to None
        reference_range = None if result.reference_range is None or math.isnan(result.reference_range) else result.reference_range
        result_value = None if result.result_value is None or math.isnan(result.result_value) else result.result_value

        return LabResult(
            test_id=result.test_id,
            result_value=result_value,
            result_unit=result.result_unit,
            reference_range=reference_range,
            result_status=result.result_status,
            performed_date=result.performed_date,
            performed_time=result.performed_time,
            reviewing_physician=result.reviewing_physician
        ) 
    
def get_lab_test_service(db: Session = Depends(get_db)) -> LabTestService:
    return LabTestService(db)