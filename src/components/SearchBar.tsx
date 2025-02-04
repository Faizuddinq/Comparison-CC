import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { searchCompanies, getCompanyDetails } from '../services/api';
import { addCompany, setError } from '../store/companiesSlice';
import { CompanySearchResult } from '../types/company';
import { debounce } from '../utils/debounce';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CompanySearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();

  const performSearch = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const searchResults = await searchCompanies(searchQuery);
      setResults(searchResults || []);
    } catch (error) {
      console.log("Error: ", error);

      dispatch(setError('Failed to search companies'));
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

 
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => performSearch(searchQuery), 300),
    [dispatch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSelectCompany = async (company: CompanySearchResult) => {
    try {
      const companyDetails = await getCompanyDetails(company.id);
      dispatch(addCompany(companyDetails));
      setQuery('');
      setResults([]);
    } catch (error) {
      console.log("Error: ", error);
      
      dispatch(setError('Failed to fetch company details'));
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for companies to compare..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
          {results.map((company, index) => (
            <button
              key={`${company.id}-${index}`}
              onClick={() => handleSelectCompany(company)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-150"
            >
              {company.name}
            </button>
          ))}
        </div>
      )}

      {isSearching && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center text-gray-500">
          Searching...
        </div>
      )}
    </div>
  );
};

export default SearchBar;