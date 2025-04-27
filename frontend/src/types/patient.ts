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
  primary_physician: string;
  insurance_provider: string;
  blood_type: string;
  allergies: string;
}


// export interface TestResult {
//   test_id: number
//   test_name: string
//   ordering_physician: string
//   order_datetime: string
//   result_value?: string
//   result_unit?: string
//   result_status?: 'Normal' | 'Abnormal'
//   performed_datetime?: string
// }

// export interface PatientTest {
//   test_id: number
//   test_name: string
//   ordering_physician: string
//   order_datetime: string
//   performed_datetime: string
// }

// export interface PatientDetail extends PatientNeedingCare {
//   test_history: TestResult[]
// }