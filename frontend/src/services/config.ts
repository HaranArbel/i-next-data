export const API_BASE_URL = 'http://localhost:8000';

export const endpoints = {
    patients: {
        details: (id: string) => `/patients/${id}`,
        tests: (id: string) => `/patients/${id}/tests`,
        needingTests: (page: number) => `/patients/need_tests?page=${page}`
    },
    tests: {
        result: (id: string) => `/tests/${id}/result`
    }
}; 