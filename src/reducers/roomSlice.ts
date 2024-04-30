// src/store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clearAllUserData, forgotPasswordAsync, loginUserAsync, signupUserAsync, updateUserInfoAsync } from '../actions/UserAction';


export interface Room {
    _id: string;
    
}

export interface getAllMyRoom{
  token: string;
}


