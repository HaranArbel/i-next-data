export interface TestResult {
    result_id: number;
    test_id: number;
    result_value: string;
    result_unit: string;
    reference_range: string;
    result_status: string;
    performed_date: string;
    performed_time: string;
    reviewing_physician: string;
}