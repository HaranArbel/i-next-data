import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PatientTable from "./PatientTable"
import { apiService } from "../services/api"
import { Patient, PaginatedResponse } from "../types/patient"
import { Activity } from "lucide-react"

export const Dashboard = () => {
    const [patients, setPatients] = useState<Patient[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        apiService.getPatients(currentPage).then((paginatedResponse: PaginatedResponse<Patient>) => {
            setPatients(paginatedResponse.items)
            setTotalPages(paginatedResponse.total_pages)
        })
    }, [currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handlePatientSelect = (patientId: number) => {
        navigate(`/patient/${patientId}`)
    }

    return (
        <div className="space-y-6 p-4">
            <div className="flex items-center justify-center max-w-12xl mx-auto mb-8 space-x-4">
                <Activity className="h-8 w-8 text-cyan-600" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Patient Monitoring Dashboard
                </h1>
            </div>
            <PatientTable 
                patients={patients} 
                onPatientSelect={handlePatientSelect} 
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
            <div className="max-w-7xl mx-auto mt-8 text-center text-sm text-gray-500">
                <p>© 2025 Patient Monitoring System</p>
            </div>
        </div>
    )
}