import { api } from '@/lib/api';

export const fetchUser = async () => {
	const { data } = await api.get('/users/me');
	return data;
};
