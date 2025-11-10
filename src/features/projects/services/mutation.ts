import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Project, ProjectQueriesKeys } from '../types/projects';
import { toast } from 'sonner';
import { createProject, deleteProject, updateProject } from './projects';
import { ProjectFormSchema } from '../schemas/projects';
import axios from 'axios';

interface ProjectMutationProps {
	setDialogOpen: (open: boolean) => void;
	setEditingProject: (project: Project | null) => void;
}
export function useCreateProjectMutation({ setDialogOpen, setEditingProject }: ProjectMutationProps) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createProject,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [ProjectQueriesKeys.GET_PROJECT_LIST, { page: 1, limit: 10 }] });
			await queryClient.invalidateQueries({ queryKey: [ProjectQueriesKeys.GET_RECENT_PROJECT_LIST] });
			toast.success('Projeto criado com sucesso!');
			setDialogOpen(false);
			setEditingProject(null);
		},
		onError: () => {
			toast.error('Erro ao criar projeto!');
		},
	});
}

export function useUpdateProjectMutation({ setDialogOpen, setEditingProject }: ProjectMutationProps) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, project }: { id: string; project: ProjectFormSchema }) => updateProject(id, project),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [ProjectQueriesKeys.GET_PROJECT_LIST, { page: 1, limit: 10 }] });
			await queryClient.invalidateQueries({ queryKey: [ProjectQueriesKeys.GET_RECENT_PROJECT_LIST] });
			toast.success('Projeto atualizado com sucesso!');
			setDialogOpen(false);
			setEditingProject(null);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.message);
			}
		},
	});
}

export function useDeleteProjectMutation({ setProjectDeleteDialogOpen }: { setProjectDeleteDialogOpen: (open: boolean) => void }) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteProject(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [ProjectQueriesKeys.GET_PROJECT_LIST] });
			await queryClient.invalidateQueries({ queryKey: [ProjectQueriesKeys.GET_RECENT_PROJECT_LIST] });
			toast.success('Projeto excluído com sucesso!');
			setProjectDeleteDialogOpen(false);
		},
		onError: () => {
			toast.error('Erro ao excluir projeto!');
		},
	});
}
