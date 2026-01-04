import { combineSlices, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import filterSlice from "./filterSlice";

let store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    filter: filterSlice,
  },
});

export default store; 