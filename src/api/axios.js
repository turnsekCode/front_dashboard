import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.pixeltech.es/api",
  // baseURL: 'http://localhost:5000/api',
  // baseURL: 'https://test.quickgold.es/api',
  withCredentials: true,
});

export default instance;
