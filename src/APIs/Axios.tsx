import axios from 'axios';

// Create the Axios instance
const apiClient = axios.create({
  baseURL: 'https://backend.byteboot.in/',
  timeout: 5000, // Optional: time out after 5 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;