import axios from 'axios';
import { API_URL } from '@/types/env';
import { useAuthStore } from '@/store/auth.store';

const api = axios.create({
	baseURL: API_URL,
});

api.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().user?.token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			// Previne loop de redirecionamento se a própria página de login causar 401
			if (!window.location.pathname.includes('/login')) {
				const { clearCredentials } = useAuthStore.getState();
				clearCredentials();
				// Força um hard reload para a página de login para limpar todo o estado
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	},
);

export { api };
