from sqlalchemy.orm import Session
from ..db_models.patient import PatientNeedingTests as PatientNeedingTestsModel


class DepartmentService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_departments(self):
        return [row[0] for row in self.db.query(PatientNeedingTestsModel.department).distinct().all()]