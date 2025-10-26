import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../services/login';
import { AuthKey } from './useCheckAuth';
import { toast } from 'sonner';
import axios from 'axios';
import { fetchUser } from '../services/user';
import { useAuthStore } from '@/store/auth.store';

export function useLogin() {
	const queryClient = useQueryClient();
	const setUser = useAuthStore((state) => state.setUser);

	return useMutation({
		mutationFn: login,
		onSuccess: async () => {
			try {
				const user = await fetchUser();
				setUser(user);
				queryClient.setQueryData([AuthKey.CHECK_AUTH], user);
				toast.success('Login realizado com sucesso!');
			} catch {
				toast.error('Login bem-sucedido, mas falha ao buscar seus dados.');
			}
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				toast.error('Email ou senha inválidos.');
			} else {
				toast.error('Erro inesperado. Tente novamente.');
			}
		},
	});
}
