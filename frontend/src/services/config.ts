export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const endpoints = {
    patients: {
        details: (id: string) => `/patients/${id}`,
        tests: (id: string) => `/patients/${id}/tests`,
        needingTests: (page: number, department: string) => `/patients/need_tests?page=${page}&department=${department}`

    },
    tests: {
        result: (id: string) => `/tests/${id}/result`
    },
    departments: {
        list: () => `/departments`
    }
    
}; 