from .lab_test import LabTest
from .lab_result import LabResult
from .patient import AggregatedPatientInformation, PatientNeedingTests, PaginatedResponse
from .department import Department

__all__ = ["LabTest", "LabResult", "AggregatedPatientInformation", "PatientNeedingTests", "PaginatedResponse", "Department"]