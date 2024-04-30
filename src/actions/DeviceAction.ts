import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ForgotPasswordData, SignupData, UpdateUserInfoData, UserLoginParams } from "../reducers/userSlice";
import api from '../services/api';
import { AddDeiveToHome, checkDeviceAvailable, GetStatusConfirm, UpdateDevice } from "../reducers/deviceSlice";

export const checkDeviceAvailableAsync = createAsyncThunk(
    'devices/checkDeviceAvailable',
    async (checkDeviceAvailableParams: checkDeviceAvailable, { rejectWithValue }) => {
      try {
        const response = await api.post('/devices/checkDeviceAvailable', checkDeviceAvailableParams);
        return response;
      } catch (error: any) {
        // If the server responds with an error message, reject the promise with that message
        if (error.response && error.response.data && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          // Otherwise, reject with a generic error message
          return rejectWithValue('An error occurred');
        }
      }
    }
  );

export const addDeiveToHomeAsync = createAsyncThunk(
  'devices/addDeiveToHome',
  async (addDeviceParams: AddDeiveToHome, { rejectWithValue }) => {
    try {
      const response = await api.post('/devices/addDeiveToHome', addDeviceParams);
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

export const getStatusConfirmAsync = createAsyncThunk(
  'devices/getStatusConfirm',
  async (getStatusConfirnParams: GetStatusConfirm, { rejectWithValue }) => {
    try {
      const response = await api.post('/devices/getStatusConfirm', getStatusConfirnParams);
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

export const updateDeviceAsync = createAsyncThunk(
  'devices/updateDevice',
  async (updateDeviceParams: UpdateDevice,  { rejectWithValue}) => {
    try {
      const response = await api.post('/devices/updateDevice', updateDeviceParams);
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
)

// export const updateUserInfoAsync = createAsyncThunk(
//   'user/updateUserInfo',
//   async (updateUserInfoData: UpdateUserInfoData) => {
//     const response = await api.post('/user/update-info', updateUserInfoData);
//     return response.data;
//   }
// );
