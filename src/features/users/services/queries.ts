import { queryOptions } from '@tanstack/react-query';
import { fetchUserList } from '../services/users';
import { UserQueriesKeys } from '../types/user';

interface UserListParams {
	page: number;
	limit: number;
	search?: string;
	role?: string;
	status?: string;
}

export const usersQueries = {
	list: ({ page, limit, search, role, status }: UserListParams) =>
		queryOptions({
			queryKey: [UserQueriesKeys.GET_USER_LIST, { page, limit, search, role, status }],
			queryFn: () => fetchUserList({ page, limit, search, role, status }),
		}),
};
