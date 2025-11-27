import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCampaigns, fetchCampaignById, createCampaign, updateCampaign, deleteCampaign, fetchCampaignMetrics } from '../services/campaign';
import { CampaignFormData } from '../types/campaign';
import { toast } from 'sonner';
import axios from 'axios';
import { ProjectKeys } from '@/features/projects/hooks/useProject';

export const CampaignKeys = {
	all: ['campaigns'] as const,
	lists: () => [...CampaignKeys.all, 'list'] as const,
	list: (projectId: string, filters: string) => [...CampaignKeys.lists(), projectId, filters] as const,
	details: () => [...CampaignKeys.all, 'detail'] as const,
	detail: (projectId: string, campaignId: string) => [...CampaignKeys.details(), projectId, campaignId] as const,
	metrics: (projectId: string) => [...CampaignKeys.all, 'metrics', projectId] as const,
};

interface UseCampaignsParams {
	projectId: string;
	page?: number;
	limit?: number;
	search?: string;
}

export const useCampaigns = ({ projectId, page = 1, limit = 10, search }: UseCampaignsParams) => {
	return useQuery({
		queryKey: CampaignKeys.list(projectId, JSON.stringify({ page, limit, search })),
		queryFn: () => fetchCampaigns(projectId, { page, limit, search }),
		staleTime: 1000 * 60 * 5, // 5 minutos
	});
};

export const useCampaign = (projectId: string, campaignId: string) => {
	return useQuery({
		queryKey: CampaignKeys.detail(projectId, campaignId),
		queryFn: () => fetchCampaignById(projectId, campaignId),
		enabled: !!projectId && !!campaignId,
	});
};

export const useCampaignMetrics = (projectId: string) => {
	return useQuery({
		queryKey: CampaignKeys.metrics(projectId),
		queryFn: () => fetchCampaignMetrics(projectId),
		staleTime: 1000 * 60 * 2, // 2 minutos
	});
};

export const useCreateCampaign = (projectId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (campaign: CampaignFormData) => createCampaign(projectId, campaign),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CampaignKeys.lists() });
			queryClient.invalidateQueries({ queryKey: CampaignKeys.metrics(projectId) });
			queryClient.invalidateQueries({ queryKey: ProjectKeys.metrics(projectId) });
			toast.success('Campanha criada com sucesso');
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message || 'Erro ao criar campanha';
				toast.error(message);
			}
		},
	});
};

export const useUpdateCampaign = (projectId: string, campaignId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (campaign: Partial<CampaignFormData>) => updateCampaign(projectId, campaignId, campaign),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CampaignKeys.lists() });
			queryClient.invalidateQueries({ queryKey: CampaignKeys.detail(projectId, campaignId) });
			queryClient.invalidateQueries({ queryKey: CampaignKeys.metrics(projectId) });
			queryClient.invalidateQueries({ queryKey: ProjectKeys.metrics(projectId) });
			toast.success('Campanha atualizada com sucesso');
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message || 'Erro ao atualizar campanha';
				toast.error(message);
			}
		},
	});
};

export const useDeleteCampaign = (projectId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (campaignId: string) => deleteCampaign(projectId, campaignId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CampaignKeys.lists() });
			queryClient.invalidateQueries({ queryKey: CampaignKeys.metrics(projectId) });
			queryClient.invalidateQueries({ queryKey: ProjectKeys.metrics(projectId) });
			toast.success('Campanha excluída com sucesso');
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message || 'Erro ao excluir campanha';
				toast.error(message);
			}
		},
	});
};
