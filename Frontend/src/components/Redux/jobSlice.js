import { createSlice } from "@reduxjs/toolkit";
import { setSearchCompanyByText } from "./companySlice";

let jobSlice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    allAdminsJob: [],
    singleJob: null,
    searchJobsByText: "",
    searchJobs:""
  },
  reducers: {
    setalljobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminsJob: (state, action) => {
      state.allAdminsJob = action.payload;
    },
    setSearchJobsByText: (state, action) => {
      state.searchJobsByText = action.payload;
    },
    setSearchJobs: (state, action) => {
      state.searchJobsByText = action.payload;
    }

  },
});

export let { setalljobs, setSingleJob, setAllAdminsJob, setSearchJobsByText , setSearchJobs} = jobSlice.actions;
export default jobSlice.reducer;