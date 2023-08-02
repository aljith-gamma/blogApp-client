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
    const statusText = String(err?.response?.statusText);
    if (statusText === 'Unauthorized' || statusText === 'Forbidden') {
        localStorage.removeItem('token')
        localStorage.removeItem('_id');
    }
    toast.error(data.message);
    return Promise.reject(data);
};


const handleSuccess = (res: AxiosResponse) => {
    const token = res?.data?.token;
    const _id = res?.data?._id;
    if(token) localStorage.setItem('token', token);
    if(_id) localStorage.setItem('_id', _id);
    if(res?.data?.message) toast.success(res.data.message);
    return res.data;
};

api.interceptors.response.use(handleSuccess, handleError);

api.interceptors.request.use((config) => {

    if (config?.url?.includes('/blog/upload') || config?.url?.includes('/profile')){
        config.headers['Content-Type'] = 'multipart/form-data';
    }

    const token = localStorage.getItem('token');

    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config;
})
