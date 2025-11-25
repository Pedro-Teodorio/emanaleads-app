import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Campaign, CampaignQueriesKeys } from '../types/campaigns';
import { toast } from 'sonner';
import { createCampaign, deleteCampaign, updateCampaign } from './campaigns';
import { CampaignFormSchema } from '../schemas/campaigns';
import axios from 'axios';

interface CampaignMutationProps {
	projectId: string;
	setDialogOpen: (open: boolean) => void;
	setEditingCampaign: (campaign: Campaign | null) => void;
}

export function useCreateCampaignMutation({ projectId, setDialogOpen, setEditingCampaign }: CampaignMutationProps) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CampaignFormSchema) => createCampaign(projectId, data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [CampaignQueriesKeys.GET_CAMPAIGN_LIST, projectId] });
			toast.success('Campanha criada com sucesso!');
			setDialogOpen(false);
			setEditingCampaign(null);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.message || 'Erro ao criar campanha!');
			} else {
				toast.error('Erro ao criar campanha!');
			}
		},
	});
}

export function useUpdateCampaignMutation({ projectId, setDialogOpen, setEditingCampaign }: CampaignMutationProps) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ campaignId, data }: { campaignId: string; data: Partial<CampaignFormSchema> }) =>
			updateCampaign(projectId, campaignId, data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [CampaignQueriesKeys.GET_CAMPAIGN_LIST, projectId] });
			toast.success('Campanha atualizada com sucesso!');
			setDialogOpen(false);
			setEditingCampaign(null);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.message || 'Erro ao atualizar campanha!');
			} else {
				toast.error('Erro ao atualizar campanha!');
			}
		},
	});
}

export function useDeleteCampaignMutation({ projectId, setDeleteDialogOpen }: { projectId: string; setDeleteDialogOpen: (open: boolean) => void }) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (campaignId: string) => deleteCampaign(projectId, campaignId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [CampaignQueriesKeys.GET_CAMPAIGN_LIST, projectId] });
			toast.success('Campanha excluída com sucesso!');
			setDeleteDialogOpen(false);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.message || 'Erro ao excluir campanha!');
			} else {
				toast.error('Erro ao excluir campanha!');
			}
		},
	});
}
