import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    location: "",
    industry: "",
    salary: "",
  },
  reducers: {
    setFilter(state, action) {
      const { type, value } = action.payload;
      state[type] = value;
    },
    clearFilters(state) {
      state.location = "";
      state.industry = "";
      state.salary = "";
    },
  },
});

export const { setFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
