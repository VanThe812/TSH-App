import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ForgotPasswordData, SignupData, UpdateUserInfoData, UserLoginParams } from "../reducers/userSlice";
import api from '../services/api';
import { createRoom, deleteRoom, getAllMyRoom, getDetailRoom, updateRoom } from "../reducers/roomSlice";

export const getAllMyRoomAsync = createAsyncThunk(
    'room/getAllMyRoom',
    async (getAllMyRoomParams: getAllMyRoom, { rejectWithValue }) => {
      try {
        const response = await api.post('/room/getAllMyRoom', getAllMyRoomParams);
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

  export const createRoomAsync = createAsyncThunk(
    'room/createRoom',
    async (createRoomParams: createRoom, { rejectWithValue }) => {
      try {
        const response = await api.post('/room/createRoom', createRoomParams);
        console.log("createAsyncThunk: ", response);
        return response.data;
      } catch (error: any) {
        // If the server responds with an error message, reject the promise with that message
        if (error.response && error.response.data && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          // Otherwise, reject with a generic error message
          return rejectWithValue('Create room has error, try again!');
        }
      }
    }
  );

  export const updateRoomAsync  = createAsyncThunk(
    'room/updateRoom',
    async (updateRoomParams: updateRoom, { rejectWithValue }) => {
      try {
        const response = await api.post('/room/updateRoom', updateRoomParams);
        console.log("createAsyncThunk: ", response);
        return response.data;
      } catch (error: any) {
        // If the server responds with an error message, reject the promise with that message
        if (error.response && error.response.data && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          // Otherwise, reject with a generic error message
          return rejectWithValue('Update room has error, try again!');
        }
      }
    }
  );
  export const deleteRoomAsync  = createAsyncThunk(
    'room/deleteRoom',
    async (deleteRoomParams: deleteRoom, { rejectWithValue }) => {
      try {
        const response = await api.post('/room/deleteRoom', deleteRoomParams);
        console.log("createAsyncThunk: ", response);
        return response.data;
      } catch (error: any) {
        // If the server responds with an error message, reject the promise with that message
        if (error.response && error.response.data && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          // Otherwise, reject with a generic error message
          return rejectWithValue('Update room has error, try again!');
        }
      }
    }
  );


  export const getDetailRoomAsync = createAsyncThunk(
    'room/getDetailRoom',
    async (getDetailRoomParams: getDetailRoom, { rejectWithValue }) => {
      try {
        const response = await api.post('/room/getDetailRoom', getDetailRoomParams);
        console.log("createAsyncThunk: ", response);
        return response.data;
      } catch (error: any) {
        // If the server responds with an error message, reject the promise with that message
        if (error.response && error.response.data && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          // Otherwise, reject with a generic error message
          return rejectWithValue('Get detail room has error, try again!');
        }
      }
    }
  );