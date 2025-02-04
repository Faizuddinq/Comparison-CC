import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CompanyColumn from './CompanyColumn';

const ComparisonGrid: React.FC = () => {
  const { selectedCompanies } = useSelector((state: RootState) => state.companies);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
      {selectedCompanies.map((company) => (
        <CompanyColumn key={company.id} company={company} />
      ))}
      {selectedCompanies.length === 0 && (
        <div className="col-span-full text-center text-gray-500 py-12">
          <p className="text-lg">Search and add companies to start comparing</p>
        </div>
      )}
    </div>
  );
};

export default ComparisonGrid;