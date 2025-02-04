import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company } from '../types/company';

interface CompaniesState {
  selectedCompanies: Company[];
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  selectedCompanies: [],
  loading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<Company>) => {
      if (state.selectedCompanies.length < 4) {
        state.selectedCompanies.push(action.payload);
      }
    },
    removeCompany: (state, action: PayloadAction<string>) => {
      state.selectedCompanies = state.selectedCompanies.filter(
        company => company.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addCompany, removeCompany, setLoading, setError } = companiesSlice.actions;
export default companiesSlice.reducer;