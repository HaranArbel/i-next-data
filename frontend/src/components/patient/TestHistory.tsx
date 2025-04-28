import React, { useState, useEffect } from 'react';
import { formatDate, formatTime } from '../../lib/utils';
import { ClipboardList, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { apiService } from '../../services/api';
import { LabTest } from '../../types/labTest';
import TestResult from './TestResult';

interface TestHistoryProps {
    patientId: number;
}

const TestHistory: React.FC<TestHistoryProps> = ({ patientId }) => {
    const [selectedTest, setSelectedTest] = useState<number | null>(null);
    const [tests, setTests] = useState<LabTest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestHistory = async () => {
            try {
                setLoading(true);
                const data = await apiService.getPatientTests(patientId.toString());
                setTests(data || []);
            } catch (err) {
                setError('Failed to load test history');
                console.error('Error fetching test history:', err);
                setTests([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTestHistory();
    }, [patientId]);

    const handleTestClick = (testId: number) => {
        setSelectedTest(selectedTest === testId ? null : testId);
    };

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                    <span className="ml-2 text-gray-600">Loading test history...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <div className="flex items-center justify-center py-8 text-red-500">
                    <AlertCircle className="h-6 w-6 mr-2" />
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <ClipboardList className="mr-2 h-5 w-5 text-blue-600" />
                Test History ({tests.length})
            </h2>
            {!tests || tests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No test history available
                </div>
            ) : (
                <div className="space-y-4">
                    {tests.map((test) => (
                        <div key={test.test_id} className="border rounded-lg overflow-hidden">
                            <button
                                onClick={() => handleTestClick(test.test_id)}
                                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between"
                            >
                                <div>
                                    <div className="font-medium text-gray-900">{test.test_name}</div>
                                    <div className="text-sm text-gray-500">
                                        Ordered by {test.ordering_physician} on {formatDate(test.order_date)} at {formatTime(test.order_time)}
                                    </div>
                                </div>
                                <ChevronRight
                                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                                        selectedTest === test.test_id ? 'transform rotate-90' : ''
                                    }`}
                                />
                            </button>
                            
                            {selectedTest === test.test_id && (
                                <TestResult testId={test.test_id} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestHistory;