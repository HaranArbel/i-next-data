# Hospital Data Integration System

A web application that helps medical staff monitor patients who have been hospitalized for more than 48 hours without new tests being performed. The system integrates data from the Patient Management System (PMS) and Laboratory Information System (LIS).

## 🩺 Monitoring Logic

The system flags patients who meet the following criteria:

- Currently admitted (no `release_date`)
- Admitted for more than 48 hours
- Last lab test was ordered more than 48 hours ago, or no test was ever ordered

This monitoring helps medical staff identify patients who may need follow-up tests or assessments, ensuring continuous quality of care during hospitalization.

### ⚠️ Clinical Caveat

A patient's latest test may have been ordered more than 48 hours ago, but the result could have been returned recently. While this may still be clinically valid, the patient's condition could have changed since then.

### 🔍 Implementation Note

Therefore:

- We flag the patient for review, but also display:
  - Latest test order timestamp
  - Latest test result timestamp
  - Time since admission

This allows clinicians to make informed decisions based on the complete timeline.

## ⚙️ Tech Stack

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

## 📂 Project Structure

_(Consider adding a small structure tree if relevant.)_

## 📋 Project Tasks

### 🛠️ Backend

- [x] Set up FastAPI project structure
- [x] Implement database models with SQLAlchemy
- [x] Create API endpoint for patients needing tests
- [ ] Create additional API endpoints:
  - Patient data
  - Lab tests
- [ ] Implement backend filtering (e.g., department, physician) 🔎
- [ ] Implement pagination for API responses 📄
- [ ] Add sorting functionality in API (sort by name, time since admission, last test ordered) ↕️
- [x] Add request validation with Pydantic ✅
- [ ] Add error handling and logging 🐞
- [ ] Add a rate limiter to API 🚦
- [ ] Add user authentication and authorization 🔐
- [ ] Review admission time threshold logic (configurable 48-hour rule) 🕒
- [ ] Use `asyncpg` driver and threading for improved DB access ⚡
- [ ] Update and enrich dummy data (realistic admissions/tests from 2024-2025) 🏥

#### 🚀 Backend - Next Steps

- [ ] 🔐 Add user authentication and authorization
- [ ] ⚡ Use `asyncpg` driver and threading for optimized DB performance

---

### 💻 Frontend

- [x] Set up React project with Vite ⚡
- [x] Create component structure 🧩
- [x] Implement patient list view (table) 🏥
- [x] Implement patient details view 📋
- [ ] Display lab test results per patient 🧪
- [ ] Implement frontend-side filters (department, physician) 🔍
- [ ] Implement frontend pagination 📚
- [ ] Implement sorting by table columns ↕️
- [ ] Add search functionality with debounce 🔎⏱️
- [ ] Add loading and error states ⏳
- [ ] Add UI notifications for new test orders (real-time updates) 📢
- [ ] Update frontend to latest React Router version 🚀
- [ ] Implement responsive design 📱

#### 🚀 Frontend - Next Steps

- [ ] 🔎⏱️ Add live search with debounce
- [ ] 📢 Add real-time UI notifications for new test orders (using WebSocket)
- [ ] 🚀 Migrate frontend to the latest React Router version

---

### 🗄️ Database

- [x] Set up PostgreSQL container with Docker 🐳
- [x] Create database schema 📊
- [x] Create data ingestion scripts for CSV files 📥
- [x] Add database indexes:
  - Admission status index
  - Lab tests timeline index
  - Lab results timeline index
- [x] Create `patients_needing_tests` view 🏥
- [ ] Convert `patients_needing_tests` to materialized view 🏗️
- [ ] Automatically refresh materialized view when new S3 files are written 🔄
- [ ] Set up read replicas for scaling 🛢️
- [ ] Polish database schema (consider denormalization) 🛠️
- [ ] Set up database validation and constraints 🔐
- [ ] Create backup and restore procedures 💾

#### 🚀 Database - Next Steps

- [ ] 🔄 Convert view to a materialized view with automatic refresh
- [ ] 🛢️ Set up read replicas for scaling

---

### 🧪 Testing and CI/CD

- [ ] Set up test environment with Testcontainers 🧪
- [ ] Write unit tests for backend services 🧹
- [ ] Write integration tests for API endpoints 🔗
- [ ] Write frontend component tests 🖥️
- [ ] Create end-to-end tests (e.g., Playwright, Cypress) 🎭
- [ ] Fix broken or incomplete pytest tests 🛠️
- [ ] Set up CI/CD pipeline 🚀
- [ ] Configure automatic testing on pull requests 🔄

#### 🚀 Testing and CI/CD - Next Steps

- [ ] 🎭 Implement full end-to-end testing (e.g., Playwright, Cypress)
- [ ] 🚀 Set up CI/CD pipeline to automate build and test workflows

---

### ☁️ Infrastructure

- [x] Set up Docker Compose for local development ⚙️
- [ ] Configure environment variables ⚙️
- [ ] Configure backend and database health checks 🩺
- [ ] Configure centralized logging and monitoring 📈
- [ ] Deploy application to cloud environment ☁️
- [ ] Configure database backups and monitoring 💾

#### 🚀 Infrastructure - Next Steps

- [ ] ☁️ Deploy the full system to a production cloud environment

### Deployment

_(Details coming soon.)_

---

## 🧬 Data Model

### Patients

| Column               | Type | Description          |
| :------------------- | :--- | :------------------- |
| `patient_id`         | INT  | Primary key          |
| `first_name`         | TEXT | Patient's first name |
| `last_name`          | TEXT | Patient's last name  |
| `date_of_birth`      | DATE | Patient's birth date |
| `primary_physician`  | TEXT | Primary care doctor  |
| `insurance_provider` | TEXT | Insurance company    |
| `blood_type`         | TEXT | Blood type           |
| `allergies`          | TEXT | Known allergies      |

### Admissions

| Column                        | Type | Description                              |
| :---------------------------- | :--- | :--------------------------------------- |
| `hospitalization_case_number` | INT  | Primary key                              |
| `patient_id`                  | INT  | Foreign key to Patients                  |
| `admission_date`              | DATE | Date of admission                        |
| `admission_time`              | TIME | Time of admission                        |
| `release_date`                | DATE | Date of release (NULL if still admitted) |
| `release_time`                | TIME | Time of release                          |
| `department`                  | TEXT | Hospital department                      |
| `room_number`                 | TEXT | Room assignment                          |

### Lab Tests

| Column               | Type | Description                 |
| :------------------- | :--- | :-------------------------- |
| `test_id`            | INT  | Primary key                 |
| `patient_id`         | INT  | Foreign key to Patients     |
| `test_name`          | TEXT | Name of the test            |
| `order_date`         | DATE | Date test was ordered       |
| `order_time`         | TIME | Time test was ordered       |
| `ordering_physician` | TEXT | Doctor who ordered the test |

### Lab Results

| Column                | Type  | Description                        |
| :-------------------- | :---- | :--------------------------------- |
| `result_id`           | INT   | Primary key                        |
| `test_id`             | INT   | Foreign key to Lab Tests           |
| `result_value`        | FLOAT | Test result value                  |
| `result_unit`         | TEXT  | Unit of measurement                |
| `reference_range`     | FLOAT | Normal range value                 |
| `result_status`       | TEXT  | Status (Normal, Abnormal High/Low) |
| `performed_date`      | DATE  | Date test was performed            |
| `performed_time`      | TIME  | Time test was performed            |
| `reviewing_physician` | TEXT  | Doctor who reviewed results        |

---

## 🛠️ Database Optimization

### Indexes

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

---

### Monitoring View

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

## 📌 Key Points

- Uses CTEs for clarity and maintainability
- Caches current timestamp for consistency
- Flags patients early for review
- Includes timestamps and hospitalization details
- Calculates time since admission and last test
- Supports clinical decision-making

---

## 🐞 Known Data Issues

### Duplicate `test_id` Values in CSVs

While validating `lab_tests.csv` and `lab_results.csv`, duplicate `test_id` values were identified, assigned to different lab tests.  
This breaks the one-to-one mapping assumption between tests and results, leading to potential mismatches and clinical inaccuracies.

> **For a full description of the issue and the solution, see GitHub Issue #3.**

---
