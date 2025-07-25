import axios from 'axios';

// Use import.meta.env.MODE correctly (no space between import and .meta)
const BASE_URL = import.meta.env.MODE === 'production' ? "/api" : 'http://localhost:5001/api';

// Create an axios instance with the base URL
const api = axios.create({
    baseURL: BASE_URL,
});

export default api;
