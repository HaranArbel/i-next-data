// In development, this will be proxied through Vite
export const API_BASE_URL = 'http://localhost:8000';  // Update this to match your backend URL

export const endpoints = {
    patients: {
        base: '/patients',
        details: (id: string) => `/patients/${id}`,
        tests: (id: string) => `/patients/${id}/tests`,
        needingTests: '/patients/need_tests'
    }
}; 