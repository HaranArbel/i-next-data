import React, { useState } from 'react';
import { PatientDetails } from '../types/patient';
import PatientHeader from './PatientHeader';
import PatientInfoTable from './PatientInfoTable';

interface PatientCardProps {
  patientDetails: PatientDetails;
}

const PatientCard: React.FC<PatientCardProps> = ({ patientDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-lg translate-y-[-2px]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PatientHeader patientDetails={patientDetails} />
      <PatientInfoTable patientDetails={patientDetails} />
    </div>
  );
};

export default PatientCard;