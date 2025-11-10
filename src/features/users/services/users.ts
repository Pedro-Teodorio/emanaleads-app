import { api } from '@/lib/api';
import { User, UserAPIResponse } from '../types/user';
import { UserFormSchema } from '../schemas/user';

interface GetUsersParams {
	page?: number;
	limit?: number;
	search?: string;
}

export const fetchUserList = async ({
	page = 1,
	limit = 10,
	search,
}: GetUsersParams): Promise<UserAPIResponse> => {
	const params = new URLSearchParams();
	params.append('page', page.toString());
	params.append('limit', limit.toString());
	if (search) {
		params.append('search', search);
	}

	const { data } = await api.get(`/users?${params.toString()}`);
	return data;
};

export const createUser = async (user: UserFormSchema): Promise<User> => {
	const { data } = await api.post('/users', user);
	return data;
};

export const updateUser = async (id: string, user: UserFormSchema): Promise<User> => {
	const { data } = await api.put(`/users/${id}`, user);
	return data;
};

export const deleteUser = async (id: string): Promise<void> => {
	await api.delete(`/users/${id}`);
};