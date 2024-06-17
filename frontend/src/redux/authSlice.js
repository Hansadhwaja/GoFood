import { createSlice } from '@reduxjs/toolkit';

const initialState = false; // User is logged out by default

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      return true; // User is logged in
    },
    logout: (state) => {
      return false; // User is logged out
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
