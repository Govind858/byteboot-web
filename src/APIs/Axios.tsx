import axios from 'axios';

// Create the Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000, // Optional: time out after 5 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;