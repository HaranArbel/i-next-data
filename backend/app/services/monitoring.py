from abc import ABC, abstractmethod
from sqlalchemy.orm import Session
from ..models.monitoring import PatientNeedingTests
from typing import List
import logging

logger = logging.getLogger(__name__)

class MonitoringServiceBase(ABC):
    @abstractmethod
    def get_patients_needing_tests(self) -> List[PatientNeedingTests]:
        pass

class MonitoringService(MonitoringServiceBase):
    def __init__(self, db: Session):
        self.db = db

    def get_patients_needing_tests(self) -> List[PatientNeedingTests]:
        """Get all patients who need tests based on monitoring criteria"""
        query = self.db.query(PatientNeedingTests)
        # Debug: Print the SQL
        logger.info(f"Monitoring SQL: {query.statement}")
        return query.all() 