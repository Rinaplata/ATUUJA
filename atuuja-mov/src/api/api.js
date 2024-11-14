import axios from 'axios';

const api = axios.create({
    baseURL: 'https://hwl3t3mw-5220.use2.devtunnels.ms/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;

