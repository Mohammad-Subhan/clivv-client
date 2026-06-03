import axios from "axios";
import { store } from "@/store/store";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASEURL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    
    if (config.url && (config.url.includes('login') || config.url.includes('register'))) {
        return config;
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;