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

CREATE OR REPLACE VIEW patients_needing_tests AS
WITH now AS (
    SELECT CURRENT_TIMESTAMP AS now
),
-- Only currently admitted patients
admitted AS (
    SELECT *
    FROM admissions
    WHERE release_date IS NULL
),
-- Latest test order per patient
latest_tests AS (
    SELECT DISTINCT ON (patient_id)
        test_id,
        patient_id,
        test_name,
        ordering_physician,
        order_date + order_time::time AS last_test_datetime
    FROM lab_tests
    WHERE order_date IS NOT NULL AND order_time IS NOT NULL
    ORDER BY patient_id, order_date DESC, order_time DESC
)
SELECT
    p.patient_id,
    p.first_name,
    p.last_name,
    a.hospitalization_case_number,
    a.admission_date,
    a.admission_time,
    a.department,
    a.room_number,
    now.now - (CAST(a.admission_date AS TIMESTAMP) + a.admission_time) AS time_since_admission,
    lt.last_test_datetime,
    lt.test_name,
    lt.ordering_physician,
    CASE
        WHEN lt.last_test_datetime IS NULL THEN 'No tests ordered'
        WHEN now.now - lt.last_test_datetime > INTERVAL '48 hours' THEN 'Test needed'
    END AS test_status
FROM
    patients p
    JOIN admitted a ON p.patient_id = a.patient_id
    LEFT JOIN latest_tests lt ON p.patient_id = lt.patient_id,
    now
WHERE
    now.now - (CAST(a.admission_date AS TIMESTAMP) + a.admission_time) > INTERVAL '48 hours'
    AND (
        lt.last_test_datetime IS NULL
        OR now.now - lt.last_test_datetime > INTERVAL '48 hours'
    );
