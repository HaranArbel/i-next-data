-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
    patient_id INT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    primary_physician TEXT,
    insurance_provider TEXT,
    blood_type TEXT,
    allergies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admissions table
CREATE TABLE IF NOT EXISTS admissions (
    patient_id INT,
    hospitalization_case_number INT PRIMARY KEY,
    admission_date DATE,
    admission_time TIME,
    release_date DATE,
    release_time TIME,
    department TEXT,
    room_number TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

-- Create lab_tests table
CREATE TABLE IF NOT EXISTS lab_tests (
    test_id INT PRIMARY KEY,
    patient_id INT,
    test_name TEXT,
    order_date DATE,
    order_time TIME,
    ordering_physician TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

-- Create lab_results table
CREATE TABLE IF NOT EXISTS lab_results (
    result_id INT PRIMARY KEY,
    test_id INT,
    result_value FLOAT,
    result_unit TEXT,
    reference_range FLOAT,
    result_status TEXT,
    performed_date DATE,
    performed_time TIME,
    reviewing_physician TEXT,
    FOREIGN KEY (test_id) REFERENCES lab_tests(test_id)
);
