import { api } from '@/lib/api';
import { LoginSchema } from '../schemas/loginSchema';

export async function login(data: LoginSchema) {
	const response = await api.post('/auth/login', data);
	return response.data;
}

export async function logout() {
	const response = await api.post('/auth/logout');
	return response.data;
}