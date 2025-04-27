import { useEffect, useState } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import PatientTable from "./PatientTable"
import PatientCard from "./PatientCard"
import { apiService } from "../services/api"
import { Patient, PatientDetails } from "../types/patient"

export const Dashboard = () => {
    const [patients, setPatients] = useState<Patient[]>([])
    const [selectedPatient, setSelectedPatient] = useState<PatientDetails | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        console.log("Fetching patients")
        apiService.getPatients().then((data: Patient[]) => {
            setPatients(data)
        })
    }, [])

    const handlePatientSelect = async (patientId: number) => {
        try {
            setLoading(true)
            const details = await apiService.getPatientDetails(patientId.toString())
            setSelectedPatient(details)
            navigate(`/patient/${patientId}`)
        } catch (error) {
            console.error("Failed to fetch patient details:", error)
        } finally {
            setLoading(false)
        }
    }

    const isPatientRoute = location.pathname.includes('/patient/')

    return (
        <div className="space-y-6 p-4">
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    {isPatientRoute ? 'Patient Information' : 'Patient Monitoring Dashboard'}
                </h1>
            </div>
            <Routes>
                <Route path="/" element={
                    <>
                        <PatientTable 
                            patients={patients} 
                            onPatientSelect={handlePatientSelect} 
                        />
                        {loading && (
                            <div className="text-center">
                                <span className="text-gray-600">Loading patient details...</span>
                            </div>
                        )}
                    </>
                } />
                <Route 
                    path="/patient/:patientId" 
                    element={
                        selectedPatient ? (
                            <PatientCard patientDetails={selectedPatient} />
                        ) : (
                            <div>Loading...</div>
                        )
                    } 
                />
            </Routes>
            <div className="max-w-7xl mx-auto mt-8 text-center text-sm text-gray-500">
                <p>© 2024 Hospital Management System</p>
            </div>
        </div>
    )
}