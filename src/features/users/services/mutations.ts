import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, deleteUser, updateUser } from './users';
import { UserQueriesKeys } from '../types/user';
import { toast } from 'sonner';
import { UserFormSchema } from '../schemas/user';
import axios from 'axios';

export function useCreateUserMutation(isDialogOpen: (open: boolean) => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createUser,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [UserQueriesKeys.GET_USER_LIST] });
			toast.success('Usuário criado com sucesso!');
			isDialogOpen(false);
		},
		onError: () => {
			toast.error('Erro ao criar usuário!');
		},
	});
}

export function useUpdateUserMutation(isDialogOpen: (open: boolean) => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, user }: { id: string; user: UserFormSchema }) => updateUser(id, user),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [UserQueriesKeys.GET_USER_LIST] });
			toast.success('Usuário atualizado com sucesso!');
			isDialogOpen(false);
		},
		onError: () => {
			toast.error('Erro ao atualizar usuário!');
		},
	});
}

export function useDeleteUserMutation(isDialogOpen: (open: boolean) => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteUser(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [UserQueriesKeys.GET_USER_LIST] });
			toast.success('Usuário excluído com sucesso!');
			isDialogOpen(false);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response?.status === 400) {
				toast.error("Você não pode deletar seu próprio usuário");
			}

			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.errors[0].message);
			}
		},
	});
}
