export interface PaginatedResponse<T> {
  items: T[];
  total_pages: number;
}

export interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  hospitalization_case_number: number;
  admission_date: string;
  admission_time: string;
  department: string;
  room_number: string;
  time_since_admission: string;
  last_test_datetime: string;
  test_name: string;
  primary_physician: string;
}

export interface PatientDetails {
  patient_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  department: string;
  room_number: string;
  admission_date: string;
  admission_time: string;
  hospitalization_case_number: number;
  primary_physician: string;
  insurance_provider: string;
  blood_type: string;
  allergies: string;
}