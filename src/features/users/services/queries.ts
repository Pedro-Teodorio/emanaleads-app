import { queryOptions } from '@tanstack/react-query';
import { fetchUserList } from '../services/users';
import { UserQueriesKeys } from '../types/user';



export const usersQueries = {
	all: () =>
		queryOptions({
			queryKey: [UserQueriesKeys.GET_USER_LIST],
			queryFn: fetchUserList,
		}),
};
