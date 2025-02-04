import React from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeCompany } from '../store/companiesSlice';
import { Company } from '../types/company';

interface CompanyColumnProps {
  company: Company;
}

const CompanyColumn: React.FC<CompanyColumnProps> = ({ company }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{company.summary}</p>
        </div>
        <button
          onClick={() => dispatch(removeCompany(company.id))}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(company.environmentalData).map(([key, value]) => (
          <div key={key} className="border-t pt-4">
            <div className="text-sm font-medium text-gray-500">{key}</div>
            <div className="mt-1 text-lg font-semibold text-gray-900">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyColumn;