import axios from "axios";
import { store } from "@/store/store";
import { logout } from "@/store/authSlice";
import { clearSession } from "@/services/session.service";

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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            clearSession();
            store.dispatch(logout());
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;