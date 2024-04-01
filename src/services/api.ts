import React from 'react';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tsh2.io.vn', // Add your API base URL here
});
export default instance;