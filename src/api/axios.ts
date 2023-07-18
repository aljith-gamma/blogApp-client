import axios, { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json"
    }
})

const handleError = (err: AxiosError) => {
    const data: any = err?.response?.data;
  
    // Logout
    if (String(err?.response?.statusText) === 'Unauthorized') {
        localStorage.removeItem('token')
    }
    toast.error(data.message);
    return Promise.reject(data);
};


const handleSuccess = (res: AxiosResponse) => {
    const token = res?.data?.token;
    if(token) localStorage.setItem('token', token);
    toast.success(res?.data?.message);
    return res.data;
};

api.interceptors.response.use(handleSuccess, handleError);

api.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config;
})
