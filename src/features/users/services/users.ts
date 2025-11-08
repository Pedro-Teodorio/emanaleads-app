import { api } from '@/lib/api';
import { User } from '../types/user';
import { UserFormSchema } from '../schemas/user';

export const fetchUserList = async (): Promise<User[]> => {
	const { data } = await api.get('/users');
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