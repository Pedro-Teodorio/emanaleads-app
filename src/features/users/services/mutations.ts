import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, deleteUser, updateUser } from './users';
import { User, UserQueriesKeys } from '../types/user';
import { toast } from 'sonner';
import { UserFormSchema } from '../schemas/user';
import axios from 'axios';

interface UserMutationProps {
	setDialogOpen: (open: boolean) => void;
	setEditingUser: (user: User | null) => void;
}

export function useCreateUserMutation({ setDialogOpen, setEditingUser }: UserMutationProps) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createUser,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [UserQueriesKeys.GET_USER_LIST] });
			toast.success('Usuário criado com sucesso!');
			setDialogOpen(false);
			setEditingUser(null);
		},
		onError: () => {
			toast.error('Erro ao criar usuário!');
		},
	});
}

export function useUpdateUserMutation({ setDialogOpen, setEditingUser }: UserMutationProps) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, user }: { id: string; user: UserFormSchema }) => updateUser(id, user),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [UserQueriesKeys.GET_USER_LIST] });
			toast.success('Usuário atualizado com sucesso!');
			setDialogOpen(false);
			setEditingUser(null);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.message);
			}
		},
	});
}

export function useDeleteUserMutation({ setDeleteDialogOpen }: { setDeleteDialogOpen: (open: boolean) => void }) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteUser(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [UserQueriesKeys.GET_USER_LIST] });
			toast.success('Usuário excluído com sucesso!');
			setDeleteDialogOpen(false);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.message);
			}
		},
	});
}
