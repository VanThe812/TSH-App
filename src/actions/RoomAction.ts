import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ForgotPasswordData, SignupData, UpdateUserInfoData, UserLoginParams } from "../reducers/userSlice";
import api from '../services/api';
import { getAllMyRoom } from "../reducers/roomSlice";

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
