import axios from 'axios';

const api = axios.create({
    baseURL: 'https://atuuja-api-g2dqbygvb7a6cccw.centralus-01.azurewebsites.net/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;

