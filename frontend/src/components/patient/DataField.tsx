import React from 'react';

interface DataFieldProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  highlight?: boolean;
}

const DataField: React.FC<DataFieldProps> = ({ 
  label, 
  value, 
  icon,
  highlight = false
}) => {
  return (
    <div className={`p-4 ${highlight ? 'bg-blue-50' : ''} rounded-md transition-all duration-300 hover:bg-gray-50`}>
      <div className="flex items-center mb-1 text-gray-500">
        {icon && <span className="mr-2">{icon}</span>}
        <span className="text-sm uppercase tracking-wider">{label}</span>
      </div>
      <div className={`font-medium ${highlight ? 'text-blue-700' : 'text-gray-800'}`}>
        {value}
      </div>
    </div>
  );
};

export default DataField;