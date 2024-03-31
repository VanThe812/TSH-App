import { createAsyncThunk } from "@reduxjs/toolkit";
import { ForgotPasswordData, SignupData, UserLoginParams } from "../reducers/userSlice";
import api from '../services/api';

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async (loginParams: UserLoginParams) => {
      const response = await api.post('/user/login', loginParams);
      return response.data;
  }
);

export const signupUserAsync = createAsyncThunk(
'user/signup',
async (signupData: SignupData) => {
  const response = await api.post('/user/register', signupData);
  return response.data;
}
);

export const forgotPasswordAsync = createAsyncThunk(
  'user/forgotPassword',
  async (forgotPasswordData: ForgotPasswordData) => {
    const response = await api.post('/user/forgot-password', forgotPasswordData);
    return response.data;
  }
);