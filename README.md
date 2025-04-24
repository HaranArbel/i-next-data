# Hospital Data Integration System

A web application that helps medical staff monitor patients who have been hospitalized for more than 48 hours without new tests being performed. The system integrates data from the Patient Management System (PMS) and Laboratory Information System (LIS).

## 🩺 Monitoring Logic

The system flags patients who meet the following criteria:

- Currently admitted (no release_date)
- Admitted for more than 48 hours
- Last lab test was ordered more than 48 hours ago, or no test was ever ordered

This monitoring helps medical staff identify patients who may need follow-up tests or assessments, ensuring continuous quality of care during hospitalization.

### ⚠ Clinical Caveat

A patient may have had their latest test ordered more than 48 hours ago, but the result was returned recently. This might mean the test result is still clinically valid — however, the patient's condition may have changed.

### 🔍 Implementation Note

Therefore:

- We flag the patient for review, but also display:
  - Latest test order timestamp
  - Latest test result timestamp
  - Time since admission
    This allows clinicians to make informed decisions based on the complete timeline.

## Tech Stack

- **Backend**: Python with FastAPI

  - SQLAlchemy for ORM
  - Pydantic for data validation
  - pytest for testing

- **Frontend**: React with TypeScript

  - Vite for build tooling

- **Database**: PostgreSQL

  - Stores integrated data from PMS and LIS systems
  - Optimized for frequent reads and updates

- **Infrastructure**:
  - Docker for containerization
  - Docker Compose for local development
  - Testcontainers for integration testing

## Project Structure

## Project Tasks

### Database

- [x] Set up PostgreSQL container with Docker
- [x] Create database schema
- [x] Create data ingestion scripts for CSV files
- [x] Add database indexes for performance optimization
  - Admission status index
  - Lab tests timeline index
  - Lab results timeline index
- [x] Create view for patients without recent tests
  - View to identify patients needing attention
  - Include test order and result timestamps
  - Add admission duration calculation
- [ ] Convert to materialized view for better performance
  - Add refresh job running every hour
  - Add concurrent refresh support
  - Monitor refresh timing and performance
- [ ] Set up data validation and constraints
- [ ] Implement database migrations
- [ ] Create backup and restore procedures

### Backend

- [x] Set up FastAPI project structure
- [x] Implement database models with SQLAlchemy
- [x] Create API endpoint for patients needing tests
- [ ] Create API endpoints for patient data
- [ ] Create API endpoints for lab tests
- [ ] Implement filtering and pagination
- [ ] Add error handling and logging
- [ ] Add request validation
- [ ] Review admission time threshold requirement
  - Consider flagging new patients for tests even before 48-hour mark
  - Add configuration for flexible time thresholds
  - Document clinical reasoning in API responses

### Frontend

- [ ] Set up React project with Vite
- [ ] Create component structure
- [ ] Implement patient list view
- [ ] Create patient details view
- [ ] Add lab test results display
- [ ] Implement filtering and search
- [ ] Add error handling and loading states
- [ ] Implement responsive design

### Testing

- [ ] Set up testing environment with testcontainers
- [ ] Write unit tests for backend services
- [ ] Write integration tests for API endpoints
- [ ] Write frontend component tests
- [ ] Create end-to-end tests
- [ ] Set up test data fixtures

### Infrastructure

- [x] Set up Docker Compose for local development
- [ ] Configure environment variables
- [ ] Set up health checks
- [ ] Configure logging and monitoring
- [ ] Set up CI/CD pipeline
- [ ] Configure backup services

### Deployment

## Data Model

### Patients

- `patient_id` (INT): Primary key
- `first_name` (TEXT): Patient's first name
- `last_name` (TEXT): Patient's last name
- `date_of_birth` (DATE): Patient's birth date
- `primary_physician` (TEXT): Primary care doctor
- `insurance_provider` (TEXT): Insurance company
- `blood_type` (TEXT): Blood type
- `allergies` (TEXT): Known allergies

### Admissions

- `hospitalization_case_number` (INT): Primary key
- `patient_id` (INT): Foreign key to patients
- `admission_date` (DATE): Date of admission
- `admission_time` (TIME): Time of admission
- `release_date` (DATE): Date of release (NULL if still admitted)
- `release_time` (TIME): Time of release
- `department` (TEXT): Hospital department
- `room_number` (TEXT): Room assignment

### Lab Tests

- `test_id` (INT): Primary key
- `patient_id` (INT): Foreign key to patients
- `test_name` (TEXT): Name of the test
- `order_date` (DATE): Date test was ordered
- `order_time` (TIME): Time test was ordered
- `ordering_physician` (TEXT): Doctor who ordered the test

### Lab Results

- `result_id` (INT): Primary key
- `test_id` (INT): Foreign key to lab_tests
- `result_value` (FLOAT): Test result value
- `result_unit` (TEXT): Unit of measurement
- `reference_range` (FLOAT): Normal range value
- `result_status` (TEXT): Status (Normal, Abnormal High/Low)
- `performed_date` (DATE): Date test was performed
- `performed_time` (TIME): Time test was performed
- `reviewing_physician` (TEXT): Doctor who reviewed results

## Database Optimization

### Indexes

To optimize the monitoring queries, the following indexes are created:

1. **Admission Status Index**

   ```sql
   CREATE INDEX idx_admission_status ON admissions(patient_id, admission_date, release_date);
   ```

   - Speeds up queries for finding currently admitted patients
   - Optimizes time-since-admission calculations

2. **Lab Tests Timeline Index**

   ```sql
   CREATE INDEX idx_lab_tests_patient_order_datetime ON lab_tests(patient_id, order_date DESC, order_time DESC);
   ```

   - Improves performance when checking last test order date
   - Helps identify patients without recent tests

3. **Lab Results Timeline Index**
   ```sql
   CREATE INDEX idx_lab_results_patient_performed_datetime ON lab_results(test_id, performed_date DESC, performed_time DESC);
   ```
   - Optimizes queries for recent test results
   - Helps track result turnaround times

These indexes support the core monitoring functionality by reducing query execution time for frequently accessed data patterns.

### Monitoring View

```sql
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

-- Latest test order per patient (full row)
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
```

This view:

- Uses CTEs for better readability and maintainability
- Caches CURRENT_TIMESTAMP to ensure consistency across the query
- Filters for currently admitted patients early in the query
- Gets the latest test per patient using DISTINCT ON
- Includes hospitalization case number for reference
- Shows the most recent test name and ordering physician
- Calculates admission duration and time since last test
- Provides clear test status indicators
