import { ProjectQueriesKeys } from '../types/projects';
import { fetchProjectsList, listRecentProjects } from './projects';
import { queryOptions } from '@tanstack/react-query';

interface ProjectListParams {
	page: number;
	limit: number;
	search?: string;
}

export const projectsQueries = {
	list: ({ page, limit, search }: ProjectListParams) =>
		queryOptions({
			queryKey: [ProjectQueriesKeys.GET_PROJECT_LIST, { page, limit, search }],
			queryFn: () => fetchProjectsList({ page, limit, search }),
		}),
	recent: () =>
		queryOptions({
			queryKey: [ProjectQueriesKeys.GET_RECENT_PROJECT_LIST],
			queryFn: listRecentProjects,
		}),
};
