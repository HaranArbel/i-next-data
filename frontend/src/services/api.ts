import { API_BASE_URL, endpoints } from './config';
import { Patient, PatientDetails } from '../types/patient';
import { LabTest } from '../types/labTest';
import { TestResult } from '../types/testResult';
import { PaginatedResponse } from '../types/patient';

class ApiService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;    
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...options.headers,
                },
            });

            if (!response.ok) {
                const error = new Error(`HTTP error! status: ${response.status}`) as any;
                error.response = response;
                throw error;
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getPatients(page: number, department: string): Promise<PaginatedResponse<Patient>> {
        return this.request<PaginatedResponse<Patient>>(endpoints.patients.needingTests(page, department));
    }

    async getPatientDetails(patientId: string): Promise<PatientDetails> {
        return this.request<PatientDetails>(endpoints.patients.details(patientId));
    }

    async getPatientTests(patientId: string): Promise<LabTest[]> {
        return this.request<LabTest[]>(endpoints.patients.tests(patientId));
    }   

    async getTestResult(testId: string): Promise<TestResult> {
        return this.request<TestResult>(endpoints.tests.result(testId));
    }

    async getDepartments() {
        return this.request<string[]>(endpoints.departments.list());
    }
}

export const apiService = new ApiService(); 