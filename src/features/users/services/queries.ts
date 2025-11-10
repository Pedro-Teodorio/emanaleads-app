import { queryOptions } from '@tanstack/react-query';
import { fetchUserList } from '../services/users';
import { UserQueriesKeys } from '../types/user';

interface UserListParams {
	page: number;
	limit: number;
	search?: string;
}

export const usersQueries = {
	list: ({ page, limit, search }: UserListParams) =>
		queryOptions({
			queryKey: [UserQueriesKeys.GET_USER_LIST, { page, limit, search }],
			queryFn: () => fetchUserList({ page, limit, search }),
		}),
};
