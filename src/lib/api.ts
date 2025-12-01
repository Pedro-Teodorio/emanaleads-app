import axios from 'axios';
import { API_URL } from '@/types/env';
import { useAuthStore } from '@/store/auth.store';

const api = axios.create({
	baseURL: API_URL,
});

// Interceptor de request - adiciona token automaticamente
api.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Interceptor de response - limpa auth em 401
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			const { clearCredentials } = useAuthStore.getState();
			clearCredentials();
		}
		return Promise.reject(error);
	},
);

export { api };
