import { ProjectQueriesKeys } from '../types/projects';
import { fetchProjectsList, listRecentProjects } from './projects';
import { queryOptions } from '@tanstack/react-query';

interface ProjectListParams {
	page: number;
	limit: number;
	search?: string;
	status?: string;
}

export const projectsQueries = {
	list: ({ page, limit, search, status }: ProjectListParams) =>
		queryOptions({
			queryKey: [ProjectQueriesKeys.GET_PROJECT_LIST, { page, limit, search, status }],
			queryFn: () => fetchProjectsList({ page, limit, search, status }),
			staleTime: 30 * 1000, // 30s para evitar refetch agressivo
		}),
	recent: () =>
		queryOptions({
			queryKey: [ProjectQueriesKeys.GET_RECENT_PROJECT_LIST],
			queryFn: listRecentProjects,
			staleTime: 15 * 1000, // projetos recentes mudam com menor frequência
		}),
};
