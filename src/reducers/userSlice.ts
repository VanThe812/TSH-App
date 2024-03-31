// src/store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forgotPasswordAsync, loginUserAsync, signupUserAsync } from '../actions/UserAction';


export interface User {
    _id: string;
    fullname: string;
    dateOfBirth: number;
    address: string;
    email: string;
    gender: string;
    account: string;
    timecreate: number;
    timemodifile: number;
    role_id: string;
    __v: number;
    status_account: string;
    timeaccess: number;
    token: string;
}

export interface SignupData {
  account: string;
  fullname: string;
  dateOfBirth: number;
  address?: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  password: string;
}

export interface UserLoginParams {
    account: string;
    password: string;
}

export interface ForgotPasswordData {
  email: string;
}

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
    loginError: string | null; // Add loginError field
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    loginError: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUserAsync.pending, (state) => {
          state.loading = true;
          state.loginError = null; // Clear login error on pending
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.loginError = null; // Clear login error on successful login
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
          state.loading = false;
          state.loginError = action.error.message || 'Login failed';
      })
      .addCase(signupUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Signup failed';
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Forgot password request failed';
      });
    },
});

export default userSlice.reducer;
