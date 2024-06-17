import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    withCredentials: true,
});

async function getCsrfToken() {
    try {
        const response = await axios.get('/csrf-token');
        return response.data.csrf_token;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error; // You might want to handle this error more gracefully in your application
    }
}

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const csrfToken = await getCsrfToken();
            config.headers['X-XSRF-TOKEN'] = csrfToken;
        } catch (error) {
            console.error('Error setting CSRF token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;