import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;

      localStorage.removeItem("user");
    },
  },
});

export const { setLoading, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
