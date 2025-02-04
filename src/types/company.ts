export interface Company {
  id: string;
  name: string;
  summary: string;
  environmentalData: {
    [key: string]: number;
  };
}

export interface CompanySearchResult {
  id: string;
  name: string;
}