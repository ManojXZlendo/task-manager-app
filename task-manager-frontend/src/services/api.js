import axios from 'axios';

// Base URL setup
const api = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your actual backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
