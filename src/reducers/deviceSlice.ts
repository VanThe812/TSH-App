// src/store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clearAllUserData, forgotPasswordAsync, loginUserAsync, signupUserAsync, updateUserInfoAsync } from '../actions/UserAction';


export interface Device {
    _id: string;
    description: string;
    timecreate: number;
    timemodifile: number;
    userId: string;
    roomId: string;
    typeDeviceId: string;
    numberOfSubDevice: number;
    __v: number;
    subDevice: [
      {
        nameSubDevice: string,
        nameInHome: string,
        data: number,
      }
    ];
    version: string;
    thingName: string;
}

export interface checkDeviceAvailable {
  deviceCode: string;
  token: string;
}

export interface AddDeiveToHome {
  codeAccess: string;
  deviceCode: string;
  token: string;
}

export interface GetStatusConfirm {
  deviceCode: string;
  token: string;
}

export interface UpdateDevice {
  token: String,
  deviceId: String, 
  roomId: String, 
  subDevice: [
    {
      nameSubDevice: String,
      nameInHome?: String
    }
  ]
}

export interface getListDevicesInHome {
  token: String;
}

export interface getListSubDevicesInRoom {
  token: String,
  roomId: String
}

export interface getDataDevice{
  token: String,
  deviceId: String,
  nameSubDevice: String
}

export interface deviceControl {
  token: String;
  status: String;
  deviceId: String,
  nameSubDevice: String
}