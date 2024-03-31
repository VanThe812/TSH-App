import React from 'react';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://18.142.56.225:5001', // Add your API base URL here
});
export default instance;