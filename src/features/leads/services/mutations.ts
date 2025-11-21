import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLead, deleteLead, updateLead, updateLeadStatus } from './leads';
import { Lead, LeadQueriesKeys } from '../types/leads';
import { toast } from 'sonner';
import { LeadFormSchema } from '../schemas/lead';
import axios from 'axios';
import type { LeadStatus } from '@/lib/rbac';

interface LeadMutationProps {
	setDialogOpen: (open: boolean) => void;
	setEditingLead: (lead: Lead | null) => void;
}

export function useCreateLeadMutation({ setDialogOpen, setEditingLead }: LeadMutationProps) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createLead,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [LeadQueriesKeys.GET_LEAD_LIST] });
			toast.success('Lead criado com sucesso!');
			setDialogOpen(false);
			setEditingLead(null);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.message || 'Erro ao criar lead!');
			} else {
				toast.error('Erro ao criar lead!');
			}
		},
	});
}

export function useUpdateLeadMutation({ setDialogOpen, setEditingLead }: LeadMutationProps) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, lead }: { id: string; lead: LeadFormSchema }) => updateLead(id, lead),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [LeadQueriesKeys.GET_LEAD_LIST] });
			toast.success('Lead atualizado com sucesso!');
			setDialogOpen(false);
			setEditingLead(null);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.message || 'Erro ao atualizar lead!');
			} else {
				toast.error('Erro ao atualizar lead!');
			}
		},
	});
}

export function useDeleteLeadMutation({ setDeleteDialogOpen }: { setDeleteDialogOpen: (open: boolean) => void }) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteLead(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [LeadQueriesKeys.GET_LEAD_LIST] });
			toast.success('Lead excluído com sucesso!');
			setDeleteDialogOpen(false);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.message || 'Erro ao excluir lead!');
			} else {
				toast.error('Erro ao excluir lead!');
			}
		},
	});
}

export function useUpdateLeadStatusMutation({ setStatusDialogOpen }: { setStatusDialogOpen: (open: boolean) => void }) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, toStatus, reason }: { id: string; toStatus: LeadStatus; reason?: string }) => updateLeadStatus(id, { toStatus, reason }),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [LeadQueriesKeys.GET_LEAD_LIST] });
			toast.success('Status atualizado com sucesso!');
			setStatusDialogOpen(false);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.message || 'Erro ao atualizar status!');
			} else {
				toast.error('Erro ao atualizar status!');
			}
		},
	});
}
