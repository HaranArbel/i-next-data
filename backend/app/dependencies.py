from fastapi import Depends
from sqlalchemy.orm import Session
from .db.database import get_db
from .services.monitoring import MonitoringService, MonitoringServiceBase

def get_monitoring_service(db: Session = Depends(get_db)) -> MonitoringServiceBase:
    return MonitoringService(db) 