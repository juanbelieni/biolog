import axios from 'axios';

const api = axios.create({
  baseURL: process.env.apiURL,
});

export default api;
