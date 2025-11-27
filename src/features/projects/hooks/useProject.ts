import { useQuery } from '@tanstack/react-query';
import { getProjectById, getProjectMetrics } from '../services/project';

export const ProjectKeys = {
	all: ['projects'] as const,
	lists: () => [...ProjectKeys.all, 'list'] as const,
	list: (filters: string) => [...ProjectKeys.lists(), filters] as const,
	details: () => [...ProjectKeys.all, 'detail'] as const,
	detail: (id: string) => [...ProjectKeys.details(), id] as const,
	metrics: (id: string) => [...ProjectKeys.all, 'metrics', id] as const,
};

export const useProject = (projectId: string) => {
	return useQuery({
		queryKey: ProjectKeys.detail(projectId),
		queryFn: () => getProjectById(projectId),
		enabled: !!projectId,
	});
};

export const useProjectMetrics = (projectId: string) => {
	return useQuery({
		queryKey: ProjectKeys.metrics(projectId),
		queryFn: () => getProjectMetrics(projectId),
		enabled: !!projectId,
		staleTime: 1000 * 60 * 2, // 2 minutos
	});
};
