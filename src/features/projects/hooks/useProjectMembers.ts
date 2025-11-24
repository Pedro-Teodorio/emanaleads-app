import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addProjectMember, listProjectUsers, removeProjectMember, fetchMyProjects, createAndAddMember } from '../services/members';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const PROJECT_MEMBERS_KEY = 'PROJECT_MEMBERS';
export const MY_PROJECTS_KEY = 'MY_PROJECTS';

export function useProjectMembers(projectId: string) {
	return useQuery({
		queryKey: [PROJECT_MEMBERS_KEY, projectId],
		queryFn: () => listProjectUsers(projectId),
		enabled: !!projectId,
	});
}

export function useAddProjectMember(projectId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userId: string) => addProjectMember(projectId, userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [PROJECT_MEMBERS_KEY, projectId] });
			toast.success('Membro adicionado com sucesso');
		},
		onError: (error: AxiosError<{ message?: string }>) => {
			toast.error(error?.response?.data?.message || 'Erro ao adicionar membro');
		},
	});
}

export function useCreateAndAddMember(projectId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userData: { name: string; email: string; phone?: string; password?: string }) => createAndAddMember(projectId, userData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [PROJECT_MEMBERS_KEY, projectId] });
			toast.success('Membro criado e adicionado com sucesso');
		},
		onError: (error: AxiosError<{ message?: string }>) => {
			toast.error(error?.response?.data?.message || 'Erro ao criar membro');
		},
	});
}

export function useRemoveProjectMember(projectId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (memberId: string) => removeProjectMember(projectId, memberId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [PROJECT_MEMBERS_KEY, projectId] });
			toast.success('Membro removido com sucesso');
		},
		onError: (error: AxiosError<{ message?: string }>) => {
			toast.error(error?.response?.data?.message || 'Erro ao remover membro');
		},
	});
}

export function useMyProjects() {
	return useQuery({
		queryKey: [MY_PROJECTS_KEY],
		queryFn: fetchMyProjects,
	});
}
