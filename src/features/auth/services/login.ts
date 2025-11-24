import { api } from '@/lib/api';
import { LoginSchema } from '../schemas/loginSchema';
import { ForgotPasswordSchema } from '../schemas/forgotPasswordSchema';
import { ChangePasswordSchema } from '../schemas/changePasswordSchema';
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

export async function forgotPassword(data: ForgotPasswordSchema) {
	try {
		const response = await api.post('/auth/forgot-password', data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error;
		}
		throw error;
	}
}

export async function resetPassword(token: string, data: { newPassword: string }) {
	try {
		const response = await api.post(`/auth/reset-password/${token}`, data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error;
		}
		throw error;
	}
}

export async function activateAccount(token: string, data: { password: string }) {
	try {
		const response = await api.post(`/auth/activate/${token}`, data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error;
		}
		throw error;
	}
}

export async function changePassword(data: Omit<ChangePasswordSchema, 'confirmPassword'>) {
	try {
		const response = await api.post('/auth/change-password', data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error;
		}
		throw error;
	}
}
