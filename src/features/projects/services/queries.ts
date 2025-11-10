import { ProjectQueriesKeys } from '../types/projects';
import { fetchProjectsList } from './projects';
import { queryOptions } from '@tanstack/react-query';

export const projectsQueries = {
	all: () =>
		queryOptions({
			queryKey: [ProjectQueriesKeys.GET_PROJECT_LIST],
			queryFn: fetchProjectsList,
		}),
};
