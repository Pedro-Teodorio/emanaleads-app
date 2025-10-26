import axios from 'axios';
import { API_URL } from '@/types/env';

const api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => response,
	(error) => { return Promise.reject(error); }
);

export { api };
