import React, { useEffect, useState } from 'react';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';
import { TestResult as TestResultType } from '../types/TestResult';

interface TestResultProps {
    testId: number;
}

const TestResult: React.FC<TestResultProps> = ({ testId }) => {
    const [result, setResult] = useState<TestResultType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestResult = async () => {
            try {
                setLoading(true);
                const data = await apiService.getTestResult(testId.toString());
                setResult(data);
            } catch (err: any) {
                if (err.response?.status === 404) {
                    setError('Results not available yet for this test');
                } else {
                    console.error('Error fetching test result:', err);
                    setError('Failed to load test result');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTestResult();
    }, [testId]);

    if (loading) {
        return (
            <div className="p-4 border-t">
                <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                    <span className="ml-2 text-gray-600">Loading results...</span>
                </div>
            </div>
        );
    }

    if (error?.includes('Results not available yet for this test')) {
        return (
            <div className="p-4 border-t">
                <div className="flex items-center text-yellow-500">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>Results pending - Not available yet</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 border-t">
                <div className="flex items-center text-red-500">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="p-4 border-t">
                <div className="flex items-center text-yellow-500">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>Results pending</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 border-t">
            <div className="space-y-3">
                <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium">Results Available</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 gap-4 text-left">
                        <div>
                            <div className="text-sm text-gray-500">Value</div>
                            <div className="font-medium">
                                {result.result_value} {result.result_unit}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Reference Range</div>
                            <div className="font-medium">
                                {result.reference_range || 'Not Available'}
                            </div>
                        </div>
                        <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                          result.result_status === 'Normal' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                        }`}>
                          {result.result_status}
                        </div>
                      </div>
                        <div>
                            <div className="text-sm text-gray-500">Reviewed By</div>
                            <div className="font-medium">
                                {result.reviewing_physician || 'Pending Review'}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Performed</div>
                            <div className="font-medium">
                                {new Date(result.performed_date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })} at {result.performed_time.slice(0, 5)}
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestResult;
