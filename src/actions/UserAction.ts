import { createAsyncThunk } from "@reduxjs/toolkit";
import { ForgotPasswordData, SignupData, UpdateUserInfoData, UserLoginParams } from "../reducers/userSlice";
import api from '../services/api';

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async (loginParams: UserLoginParams, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/login', loginParams);
      return response.data;
    } catch (error: any) {
      // If the server responds with an error message, reject the promise with that message
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        // Otherwise, reject with a generic error message
        return rejectWithValue('An error occurred during login');
      }
    }
  }
);

export const signupUserAsync = createAsyncThunk(
'user/signup',
async (signupData: SignupData) => {
  const response = await api.post('/user/register', signupData);
  console.log(response)
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

export const updateUserInfoAsync = createAsyncThunk(
  'user/updateUserInfo',
  async (updateUserInfoData: UpdateUserInfoData) => {
    const response = await api.post('/user/update-info', updateUserInfoData);
    return response.data;
  }
);