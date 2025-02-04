import { Company, CompanySearchResult } from "../types/company";
import { debounce } from "../utils/debounce";
import { companies } from "./data";

// callback type
type SearchCallback = (results: CompanySearchResult[] | null, error?: string) => void;

// Debounced search function 
const debouncedSearchCompanies = debounce((query: string, callback: SearchCallback) => {


  const results = companies
    .filter(company => company.name.toLowerCase().includes(query.toLowerCase()))
    .map(({ id, name }) => ({ id, name }));

  if (results.length === 0) {
    callback(null, "No companies found.");
    return;
  }

  callback(results, undefined); 
}, 300);

// Function to search companies
export const searchCompanies = async (query: string): Promise<CompanySearchResult[]> => {
  return new Promise((resolve, reject) => {
    debouncedSearchCompanies(query, (results, error) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(results || []);
      }
    });
  });
};

// Function to get company details
export const getCompanyDetails = async (id: string): Promise<Company> => {
  return new Promise((resolve, reject) => {
    const company = companies.find(comp => comp.id === id);
    if (!company) {
      reject(new Error("Company not found"));
    } else {
      resolve(company);
    }
  });
};
