import { createSlice } from "@reduxjs/toolkit";

let companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompanies: [],
    companies: [],
    searchCompanyByText: ""
  },
  reducers: {   
    setSingleCompany: (state, action) => {
      state.singleCompanies = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    }
  },
});

export let { setSingleCompany, setCompanies, setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;