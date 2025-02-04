// import axios from 'axios';
import { Company, CompanySearchResult } from '../types/company';
import { debounce } from '../utils/debounce';

// const API_BASE_URL = 'https://api.example.com'; 

const companies: Company[] = [
  { id: '1', name: 'Tesla, Inc.', environmentalData: { 'Carbon Emissions': 200, 'Water Usage': 150, 'Renewable Energy': 80, 'Waste Reduction': 60 } },
  { id: '2', name: 'Apple Inc.', environmentalData: { 'Carbon Emissions': 180, 'Water Usage': 130, 'Renewable Energy': 90, 'Waste Reduction': 75 } },
  { id: '3', name: 'Microsoft Corporation', environmentalData: { 'Carbon Emissions': 250, 'Water Usage': 170, 'Renewable Energy': 85, 'Waste Reduction': 65 } },
  { id: '4', name: 'Amazon.com, Inc.', environmentalData: { 'Carbon Emissions': 300, 'Water Usage': 190, 'Renewable Energy': 70, 'Waste Reduction': 50 } },
  { id: '5', name: 'Google LLC', environmentalData: { 'Carbon Emissions': 220, 'Water Usage': 140, 'Renewable Energy': 95, 'Waste Reduction': 80 } },
  { id: '6', name: 'Meta Platforms, Inc.', environmentalData: { 'Carbon Emissions': 260, 'Water Usage': 180, 'Renewable Energy': 85, 'Waste Reduction': 70 } },
  { id: '7', name: 'Netflix, Inc.', environmentalData: { 'Carbon Emissions': 150, 'Water Usage': 100, 'Renewable Energy': 75, 'Waste Reduction': 55 } },
  { id: '8', name: 'NVIDIA Corporation', environmentalData: { 'Carbon Emissions': 210, 'Water Usage': 160, 'Renewable Energy': 80, 'Waste Reduction': 60 } },
  { id: '9', name: 'Samsung Electronics', environmentalData: { 'Carbon Emissions': 280, 'Water Usage': 200, 'Renewable Energy': 65, 'Waste Reduction': 45 } },
  { id: '10', name: 'Intel Corporation', environmentalData: { 'Carbon Emissions': 230, 'Water Usage': 175, 'Renewable Energy': 78, 'Waste Reduction': 68 } },
];

export const searchCompanies = debounce(async (query: string): Promise<CompanySearchResult[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        companies.filter(company => company.name.toLowerCase().includes(query.toLowerCase()))
      );
    }, 300);
  });
}, 300);

export const getCompanyDetails = async (id: string): Promise<Company> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const company = companies.find(c => c.id === id);
      if (company) {
        resolve({
          ...company,
          summary: `${company.name} is a leading global corporation known for innovation and technological advancements.`,
        });
      } else {
        throw new Error('Company not found');
      }
    }, 500);
  });
};