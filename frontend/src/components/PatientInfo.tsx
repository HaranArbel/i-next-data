import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PatientCard } from "./PatientCard";
import { apiService } from "../services/api";
import { PatientDetails } from "../types/patient";
import { Activity } from "lucide-react";

export const PatientInfo = () => {
    const [patient, setPatient] = useState<PatientDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const { patientId } = useParams<{ patientId: string }>();

    useEffect(() => {
        if (patientId) {
            setLoading(true);
            apiService.getPatientDetails(patientId)
                .then(details => {
                    if (details) {
                        setPatient(details);
                    }
                })
                .catch(error => {
                    console.error("Failed to fetch patient details:", error);
                })
                .finally(() => setLoading(false));
        }
    }, [patientId]);

    return (
        <div className="space-y-6 p-4">
            <div className="flex items-center justify-center max-w-12xl mx-auto mb-8 space-x-4">
                <Activity className="h-8 w-8 text-cyan-600" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Patient Information
                </h1>
            </div>
            {loading ? (
                <div className="text-center">
                    <span className="text-gray-600">Loading patient details...</span>
                </div>
            ) : patient ? (
                <PatientCard patientDetails={patient} />
            ) : (
                <div>No patient data available.</div>
            )}
            <div className="max-w-7xl mx-auto mt-8 text-center text-sm text-gray-500">
                <p>© 2025 Patient Monitoring System</p>
            </div>
        </div>
    );
};