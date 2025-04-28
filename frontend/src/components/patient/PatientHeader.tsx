import React from 'react';
import { ClipboardList, User } from 'lucide-react';
import { PatientDetails } from '../../types/patient';
import { calculateAge } from '../../lib/utils';

interface PatientHeaderProps {
  patientDetails: PatientDetails;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ patientDetails }) => {
  const age = calculateAge(patientDetails.date_of_birth);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-t-lg border-b border-gray-200">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {patientDetails.first_name} {patientDetails.last_name}, {age} years old
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center mt-1 text-gray-600">
            <span className="flex items-center">
              <span className="font-medium">Patient ID:</span>
              <span className="ml-1">{patientDetails.patient_id}</span>
            </span>
            <span className="hidden sm:block mx-2">•</span>
            <span className="flex items-center mt-1 sm:mt-0">
              <span className="font-medium">Case #:</span>
              <span className="ml-1">{patientDetails.hospitalization_case_number}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-md text-blue-700">
        <ClipboardList className="h-5 w-5" />
        <span className="font-medium">{patientDetails.department}</span>
        <span className="px-2 py-1 bg-blue-100 rounded-md font-semibold">
          Room {patientDetails.room_number}
        </span>
      </div>
    </div>
  );
};

export default PatientHeader;