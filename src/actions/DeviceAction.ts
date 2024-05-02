import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ForgotPasswordData, SignupData, UpdateUserInfoData, UserLoginParams } from "../reducers/userSlice";
import api from '../services/api';
import { AddDeiveToHome, checkDeviceAvailable, deviceControl, getDataDevice, getListDevicesInHome, getListSubDevicesInRoom, GetStatusConfirm, UpdateDevice } from "../reducers/deviceSlice";

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

export const getListDevicesInHomeAsync = createAsyncThunk(
  'devices/getListDevicesInHome',
  async (getListDevicesInHomeParams: getListDevicesInHome, { rejectWithValue }) => {
    try {
      const response = await api.post('/devices/getListDevicesInHome', getListDevicesInHomeParams);
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

export const getListSubDevicesInRoomAsync = createAsyncThunk(
  'devices/getListSubDevicesInRoom',
  async (getListSubDevicesInRoomParams: getListSubDevicesInRoom, { rejectWithValue }) => {
    try {
      const response = await api.post('/devices/getListSubDevicesInRoom', getListSubDevicesInRoomParams);
      return response.data;
    } catch (error: any) {
      console.log(error);
      
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
export const getDataSubDeviceAsync = createAsyncThunk(
  'devices/getDataDevice',
  async (getDataDeviceParams: getDataDevice, { rejectWithValue }) => {
    try {
      const response = await api.post('/devices/getDataDevice', getDataDeviceParams);
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

export const deviceControlAsync = createAsyncThunk(
  'devices/deviceControl',
  async (deviceControlParams: deviceControl, { rejectWithValue }) => {
    try {
      const response = await api.post('/devices/deviceControl', deviceControlParams);
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

