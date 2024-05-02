// src/store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clearAllUserData, forgotPasswordAsync, loginUserAsync, signupUserAsync, updateUserInfoAsync } from '../actions/UserAction';


export interface Room {
    _id: string;
    name: string,
    userId: string,
    timecreate: string,
    timemodifile: string
}

export interface getAllMyRoom{
  token: string;
}

export interface createRoom {
  token: string;
  name: string
}

export interface updateRoom {
  token: string;
  name: string;
  roomId: string;
}

export interface deleteRoom {
  token: string;
  roomId: string;
}

export interface getDetailRoom {
  token: string
}

