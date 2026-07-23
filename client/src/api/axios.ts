import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";
const api = axios.create({ baseURL: API_URL, withCredentials: true });

api.interceptors.request.use((config) => {
	const accessToken = useAuthStore.getState().accessToken;
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

export default api;
