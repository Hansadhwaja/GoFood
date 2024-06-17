import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('auth')) || false; // Read from localStorage

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      localStorage.setItem('auth', true); // Save to localStorage
      return true; // User is logged in
    },
    logout: (state) => {
      localStorage.setItem('auth', false); // Save to localStorage
      return false; // User is logged out
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
