import { api } from '@/lib/api';
import { User, UserAPIResponse } from '../types/user';
import { UserFormSchema } from '../schemas/user';
import axios from 'axios';

interface GetUsersParams {
	page?: number;
	limit?: number;
	search?: string;
	role?: string;
	status?: string;
}

export const fetchUserList = async ({ page = 1, limit = 10, search, role, status }: GetUsersParams): Promise<UserAPIResponse> => {
	const params = new URLSearchParams();
	params.append('page', page.toString());
	params.append('limit', limit.toString());
	if (search) {
		params.append('search', search);
	}
	if (role) {
		params.append('role', role);
	}
	if (status) {
		params.append('status', status);
	}

	const { data } = await api.get(`/users?${params.toString()}`);
	return data;
};

export const createUser = async (user: UserFormSchema): Promise<User> => {
	try {
		const { data } = await api.post('/users', user);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) throw error;
		throw error;
	}
};

export const updateUser = async (id: string, user: UserFormSchema): Promise<User> => {
	try {
		const { data } = await api.put(`/users/${id}`, user);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) throw error;
		throw error;
	}
};

export const deleteUser = async (id: string): Promise<void> => {
	try {
		await api.delete(`/users/${id}`);
	} catch (error) {
		if (axios.isAxiosError(error)) throw error;
		throw error;
	}
};
