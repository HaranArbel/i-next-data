import React from 'react';
import { format, differenceInHours, intervalToDuration } from 'date-fns';
import { Calendar, Clock, User, Building2, FlaskConical, AlertTriangle } from 'lucide-react';

import { Patient } from '../../types/patient';
import { formatDateTime, formatShortDuration } from '../../lib/utils';
import Pagination from './Pagination';

interface PatientTableProps {
  patients: Patient[];
  onPatientSelect: (patientId: number) => void;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

function formatTimeSinceLastTest(dateString: string) {
  if (!dateString) return "N/A";
  const now = new Date();
  const lastTest = new Date(dateString);
  const hours = differenceInHours(now, lastTest);

  if (hours < 96) {
    return `${hours}h`;
  } else {
    const duration = intervalToDuration({ start: lastTest, end: now });
    const parts = [];
    if (duration.years) parts.push(`${duration.years}y`);
    if (duration.months) parts.push(`${duration.months}m`);
    if (duration.days) parts.push(`${duration.days}d`);
    return parts.join(' ') || '0d';
  }
}

const PatientTable: React.FC<PatientTableProps> = ({ patients, onPatientSelect, currentPage, totalPages, handlePageChange }) => {
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
                      <span>Duration: {formatShortDuration(patient.time_since_admission)}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-left">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {patient.department}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Room {patient.room_number}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Primary Physician: {patient.primary_physician}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-red-600 mt-1">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span>
                        Time Since Last Test: {formatTimeSinceLastTest(patient.last_test_datetime)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Last Test: {format(new Date(patient.last_test_datetime), 'MMM dd, yyyy HH:mm')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <FlaskConical className="h-4 w-4 text-cyan-500" />
                      <span>{patient.test_name}</span>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default PatientTable;
