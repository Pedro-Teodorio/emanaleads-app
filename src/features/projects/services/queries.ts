import { ProjectQueriesKeys } from '../types/projects';
import { fetchProjectsList, listRecentProjects } from './projects';
import { queryOptions } from '@tanstack/react-query';

export const projectsQueries = {
	all: () =>
		queryOptions({
			queryKey: [ProjectQueriesKeys.GET_PROJECT_LIST],
			queryFn: fetchProjectsList,
		}),
	recent: () =>
		queryOptions({
			queryKey: [ProjectQueriesKeys.GET_RECENT_PROJECT_LIST],
			queryFn: listRecentProjects,
		}),
};
