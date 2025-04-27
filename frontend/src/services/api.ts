import { API_BASE_URL, endpoints } from './config';
// import { PatientNeedingCare, PatientDetail, PatientTest } from '@/types/patient';
import { Patient, PatientDetails } from '../types/patient';

class ApiService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        console.log("Making API request to:", url);  // Better logging
        
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received data:", data);  // Log the response data
            return data;
        } catch (error) {
            console.error("API request failed:", error);  // Log any errors
            throw error;
        }
    }

    async getPatients(): Promise<Patient[]> {
        console.log("Calling getPatientsNeedingTests");  // Debug log
        return this.request<Patient[]>(endpoints.patients.needingTests);
    }

    async getPatientDetails(patientId: string): Promise<PatientDetails> {
        return this.request<PatientDetails>(endpoints.patients.details(patientId));
    }

    // async getPatientTests(patientId: string): Promise<PatientTest[]> {
    //     return this.request<PatientTest[]>(endpoints.patients.tests(patientId));
    // }
}

export const apiService = new ApiService(); 