import React from 'react';
import { 
  Clock, 
  Calendar, 
  Stethoscope, 
  HeartPulse,
  AlertCircle,
  Building,
  User
} from 'lucide-react';
import { PatientDetails } from '../../types/patient';
import { formatDate, formatTime } from '../../lib/utils';
import DataField from './DataField';

interface PatientInfoTableProps {
  patientDetails: PatientDetails;
}

const PatientInfoTable: React.FC<PatientInfoTableProps> = ({ patientDetails }) => {
  return (
    <div className="bg-white p-6 rounded-b-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Admission Information */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center text-left">
            <Calendar className="mr-2 h-5 w-5 text-blue-600" />
            Admission Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <DataField 
              label="Admission Date" 
              value={formatDate(patientDetails.admission_date)} 
              icon={<Calendar className="h-4 w-4" />}
            />
            <DataField 
              label="Admission Time" 
              value={formatTime(patientDetails.admission_time)} 
              icon={<Clock className="h-4 w-4" />}
            />
            <DataField 
              label="Primary Physician" 
              value={patientDetails.primary_physician} 
              icon={<User className="h-4 w-4" />}
              highlight
            />
          </div>
        </div>

        {/* Medical Information */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center text-left">
            <Stethoscope className="mr-2 h-5 w-5 text-blue-600" />
            Medical Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <DataField 
              label="Blood Type" 
              value={patientDetails.blood_type} 
              icon={<HeartPulse className="h-4 w-4" />}
            />
            <DataField 
              label="Allergies" 
              value={patientDetails.allergies} 
              icon={<AlertCircle className="h-4 w-4" />}
            />
            <DataField 
              label="Insurance Provider" 
              value={patientDetails.insurance_provider} 
              icon={<Building className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoTable;