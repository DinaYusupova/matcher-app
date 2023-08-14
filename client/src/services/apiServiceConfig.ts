import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const apiService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

