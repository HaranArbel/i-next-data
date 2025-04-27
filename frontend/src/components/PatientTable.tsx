import React from 'react';
import { Patient } from '../types/patient';
import { format } from 'date-fns';
import { Calendar, Clock, User, Building2, Activity, FlaskConical } from 'lucide-react';

interface PatientTableProps {
  patients: Patient[];
  onPatientSelect: (patientId: number) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({ patients, onPatientSelect }) => {
  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(`${dateStr.split('T')[0]}T${timeStr}`);
    return format(date, 'MMM dd, yyyy HH:mm');
  };

  const formatTimeSinceAdmission = (duration: string) => {
    return duration.replace(/P(\d+)Y(\d+)DT(\d+)H(\d+)M.*/, '$1y $2d $3h $4m');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admission Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Information
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr
                  key={patient.patient_id}
                  onClick={() => onPatientSelect(patient.patient_id)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.first_name} {patient.last_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {patient.patient_id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-900">
                      <Building2 className="h-4 w-4 text-green-500" />
                      <span>Case #: {patient.hospitalization_case_number}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span>{formatDateTime(patient.admission_date, patient.admission_time)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Duration: {formatTimeSinceAdmission(patient.time_since_admission)}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {patient.department}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Room {patient.room_number}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Primary: {patient.primary_physician}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-900">
                      <FlaskConical className="h-4 w-4 text-pink-500" />
                      <span>{patient.test_name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <Activity className="h-4 w-4 text-yellow-500" />
                      <span>Time Since Last Test: {formatTimeSinceAdmission(patient.time_since_admission)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Last Test: {format(new Date(patient.last_test_datetime), 'MMM dd, yyyy HH:mm')}</span>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;
