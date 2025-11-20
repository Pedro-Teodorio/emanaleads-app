import { api } from '@/lib/api';
import { LoginSchema } from '../schemas/loginSchema';
import axios from 'axios';

export async function login(data: LoginSchema) {
	try {
		const response = await api.post('/auth/login', data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error; // será tratado pelo hook useFormErrors e toasts
		}
		throw error;
	}
}

export async function logout() {
	try {
		const response = await api.post('/auth/logout');
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error;
		}
		throw error;
	}
}
