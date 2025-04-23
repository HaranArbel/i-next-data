# Hospital Data Integration System

A web application that helps medical staff monitor patients who have been hospitalized for more than 48 hours without new tests being performed. The system integrates data from the Patient Management System (PMS) and Laboratory Information System (LIS).

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
- [ ] Set up data validation and constraints
- [ ] Implement database migrations
- [ ] Create backup and restore procedures

### Backend

- [ ] Set up FastAPI project structure
- [ ] Implement database models with SQLAlchemy
- [ ] Create API endpoints for patient data
- [ ] Create API endpoints for lab tests
- [ ] Implement filtering and pagination
- [ ] Add error handling and logging
- [ ] Add request validation

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
