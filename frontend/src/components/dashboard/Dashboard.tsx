import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PatientTable from "../dashboard/PatientTable"
import { apiService } from "../../services/api"
import { Patient, PaginatedResponse } from "../../types/patient"
import { Activity, Filter } from "lucide-react"
import { BarLoader } from "react-spinners"

export const Dashboard = () => {
    const [patients, setPatients] = useState<Patient[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState<string>("")
    const [departments, setDepartments] = useState<string[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        apiService.getPatients(currentPage, selectedDepartment)
            .then((paginatedResponse: PaginatedResponse<Patient>) => {
                setPatients(paginatedResponse.items)
                setTotalPages(paginatedResponse.total_pages)
            })
            .finally(() => setLoading(false))
    }, [currentPage, selectedDepartment])

    useEffect(() => {
        apiService.getDepartments().then(setDepartments)
    }, [])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handlePatientSelect = (patientId: number) => {
        navigate(`/patient/${patientId}`)
    }

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartment(event.target.value)
        setCurrentPage(1)
    }

    return (
        <div className="space-y-6 p-4">
            <div className="flex items-center justify-center max-w-12xl mx-auto mb-8 space-x-4">
                <Activity className="h-8 w-8 text-cyan-600" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Patient Monitoring Dashboard
                </h1>
            </div>
            <div className="max-w-7xl mx-auto mb-4 flex justify-start items-center space-x-2">
                <Filter className="h-5 w-5 text-yellow-500" />
                <select
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    className="p-2 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                        <option key={dept} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>
            </div>
            {loading ? (
                <div className="flex flex-col justify-center items-center h-32">
                    <BarLoader color="#06b6d4" height={6} width={200} />
                    <span className="mt-2 text-cyan-600">Loading...</span>
                </div>
            ) : (
                <PatientTable 
                    patients={patients} 
                    onPatientSelect={handlePatientSelect} 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            )}
            <div className="max-w-7xl mx-auto mt-8 text-center text-sm text-gray-500">
                <p>© 2025 Patient Monitoring System</p>
            </div>
        </div>
    )
}