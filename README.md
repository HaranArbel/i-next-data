# Hospital Data Integration System

## Background

A web application that helps medical staff monitor patients who have been hospitalized for more than 48 hours without new tests being performed.  
The system integrates data from the Patient Management System (PMS) and Laboratory Information System (LIS).

The hospital uses two separate database systems:

- **Patient Management System (PMS)**
- **Laboratory Information System (LIS)**

Both systems sync their data to S3 buckets every few seconds in CSV format. Each update triggers a new file creation in the S3 bucket.

> **Note:** Reading and processing data from the S3 bucket is out of scope for this project. Sample data was injected directly into the database.

## High-Level Solution

This project is a full-stack patient monitoring system that integrates and displays data from PMS and LIS, enabling hospital staff to quickly identify patients who have been hospitalized for over 48 hours without recent lab tests.

- **Backend**: Built with **FastAPI (Python), SQLAlchemy ORM, Pydantic and Pytest for testing**, providing async support, modular structure, and automatic OpenAPI documentation generation.
- **Frontend**: Developed with **React, TypeScript, and Vite**, offering a modern, high-performance UI with hot module reloading and strong typing.
- **Database**: Powered by **PostgreSQL**, chosen for its relational data modeling, ACID compliance, scalability, and indexing capabilities. The database schema is normalized, with clear relationships between patients, admissions, lab tests, and lab results, ensuring data integrity and efficient querying.
- **Containerization**: The project is fully containerized using **Docker** to ensure consistent deployment across environments.

- **Features:**
  - Patient dashboard presenting patient who have been hospitalized for more than 48 hours without new tests
  - Calculates time since admission and last test
  - filtering and pagination
  - Detailed patient information and test history
  - Department-based organization

### Data Modeling

> **Note:** For the sake of this exercise, we assume that the schema of the source systems is stable, and that the application is read-only with no modifications back to PMS or LIS.

- Tables:
  - **Patients**: Contains basic patient information.
  - **Admissions**: Tracks patient admission and discharge details.
  - **Lab Tests**: Defines available lab tests.
  - **Lab Results**: Records results tied to tests and patients.
- **Relationships**:
  - Foreign keys link admissions to patients and lab results to lab tests.
  - Ensures strong referential integrity and enables complex, performant queries.
- The structure supports scalability to accommodate large volumes of hospital data efficiently.

> **Note:** A view (`patients_needing_tests`) was created in the database to serve as a virtual table for efficient patient querying. The view selects only patients who are still currently admitted to the hospital and who have not had lab tests performed in the past 48 hours.

### Database Optimization

#### Indexes

Optimized for fast monitoring queries:

1. **Admission Status Index**
   ```sql
   CREATE INDEX idx_admission_status ON admissions(patient_id, admission_date, release_date);
   ```
2. **Lab Tests Timeline Index**

   ```sql
   CREATE INDEX idx_lab_tests_patient_order_datetime ON lab_tests(patient_id, order_date DESC, order_time DESC);
   ```

3. **Lab Results Timeline Index**

   ```sql
   CREATE INDEX idx_lab_results_patient_performed_datetime ON lab_results(test_id, performed_date DESC, performed_time DESC);
   ```

<details>
<summary><b>View Query: patients_needing_tests</b></summary>

```sql
CREATE OR REPLACE VIEW patients_needing_tests AS
WITH
  now AS (
    SELECT CURRENT_TIMESTAMP AS now
  ),
  admitted AS (
    SELECT
      admissions.patient_id,
      admissions.hospitalization_case_number,
      admissions.admission_date,
      admissions.admission_time,
      admissions.release_date,
      admissions.release_time,
      admissions.department,
      admissions.room_number
    FROM admissions
    WHERE admissions.release_date IS NULL
  ),
  latest_tests AS (
    SELECT DISTINCT ON (lab_tests.patient_id)
      lab_tests.test_id,
      lab_tests.patient_id,
      lab_tests.test_name,
      lab_tests.order_date + lab_tests.order_time AS last_test_datetime
    FROM lab_tests
    WHERE lab_tests.order_date IS NOT NULL
      AND lab_tests.order_time IS NOT NULL
    ORDER BY lab_tests.patient_id, lab_tests.order_date DESC, lab_tests.order_time DESC
  )
SELECT
  p.patient_id,
  p.first_name,
  p.last_name,
  a.hospitalization_case_number,
  p.primary_physician,
  a.admission_date,
  a.admission_time,
  a.department,
  a.room_number,
  now.now - (a.admission_date::timestamp without time zone + a.admission_time::interval)::timestamp with time zone AS time_since_admission,
  lt.last_test_datetime,
  lt.test_name
FROM
  patients p
  JOIN admitted a ON p.patient_id = a.patient_id
  LEFT JOIN latest_tests lt ON p.patient_id = lt.patient_id,
  now
WHERE
  (now.now - (a.admission_date::timestamp without time zone + a.admission_time::interval)::timestamp with time zone) > INTERVAL '48 hours'
  AND (
    lt.last_test_datetime IS NULL
    OR (now.now - lt.last_test_datetime::timestamp with time zone) > INTERVAL '48 hours'
  );
```

</details>

## Project Tasks

### Backend

- [x] Set up FastAPI project structure
- [x] Implement database models with SQLAlchemy
- [x] Create API endpoints:
  - [x] Patients Needing Tests
  - [x] Patient data
  - [x] Lab tests
  - [x] Departments
- [x] Add request validation with Pydantic
- [x] Implement pagination for API responses
- [x] Implement backend filtering (e.g., department, physician)
- [x] Add strict versioning to requirements.txt

### Frontend

- [x] Set up React project with Vite
- [x] Create component structure
  - [x] Implement patient list view (table)
  - [x] Implement patient details view
  - [x] Implement test history and results per patient
- [x] Implement pagination - consider replacing with Infinite Scroll
- [x] Implement frontend-side filter
- [x] Add loading and error states

### Database

- [x] Set up PostgreSQL on cloud
- [x] Create database schema
- [x] Create ETL for loading CSV files
- [x] Add database indicies:
  - [x] Admission status index
  - [x] Lab tests timeline index
  - [x] Lab results timeline index
- [x] Set up database validation and constraints
- [x] Create `patients_needing_tests` view

### Testing and CI/CD

- [x] Set up test environment with Pytest
- [x] Write unit tests for backend services

### Infrastructure

- [x] Set up Docker Compose
- [x] Configure environment variables
- [x] Deploy application to cloud environment

---

## Next Steps

- [ ] Add dashboard stats (e.g., number of patients needing tests, average admission time)
- [ ] Add live search by patient (id/name) with debounce
- [ ] Implement sorting by table columns
- [ ] Add real-time UI notifications for new test orders (using Server Sent Events, WebSocket or polling)
- [ ] Test DB performance (high reads/writes)
- [ ] Support high read traffic:
  - [ ] Add connection pooling for improved DB access
  - [ ] Consider changing view to `materialized-view` for caching the results and supporting high read traffic
  - [ ] Set up DB read replicas for scaling
- [ ] Implement automated database migrations
- [ ] Create backup and restore procedures
- [ ] Add monitoring and logging
- [ ] Configure centralized logging and monitoring
- [ ] Add comprehensive test coverage (backend & frontend)
- [ ] Create end-to-end tests (e.g., Playwright, Cypress)
- [ ] Set up CI/CD pipeline to automate build and test workflows
- [ ] Container orchestration (e.g., Kubernetes) for production deployment

## Running the Application

### Local Development

To run the application locally using Docker Compose:

1. **Build the containers:**

   ```sh
   docker compose build
   ```

2. **Start the services:**

   ```sh
   docker compose up
   ```

3. **Access the app:**
   - The frontend will be available at: [http://localhost:80](http://localhost:80)
   - The backend API will be available at: [http://localhost:8000](http://localhost:8000)

> **Note:** Ensure you have a `.env` file in your project root with all required environment variables (see `.env.example` if available).

---

### Production Deployment

The application is deployed and accessible at:

- **Frontend (Vercel):** [https://patient-monitoring-system-six.vercel.app/](https://patient-monitoring-system-six.vercel.app/)
- **Backend (Render):** [https://patient-monitoring-system-tk8w.onrender.com/](https://patient-monitoring-system-tk8w.onrender.com/)

---

## Known Data Issues

### 1. Duplicate `test_id` Values in CSVs

While validating `lab_tests.csv` and `lab_results.csv`, duplicate `test_id` values were identified, assigned to different lab tests.  
This breaks the one-to-one mapping assumption between tests and results, leading to potential mismatches and clinical inaccuracies.

> **For a full description of the issue and the solution, see GitHub Issue #3.**

### 2. Multiple values in the `result_unit` column in `lab_results.csv` leading to ambiguity

Some rows in `lab_results.csv` contain multiple values in the `result_unit` column, which creates ambiguity about which unit applies to the result.

**Example:**

| test_id | patient_id | result_value | result_unit   | ... |
| ------- | ---------- | ------------ | ------------- | --- |
| 327681  | 123456     | 5.2          | mg/dL, mmol/L | ... |

This makes it unclear which unit should be used for interpreting the result, potentially leading to clinical misinterpretation.
