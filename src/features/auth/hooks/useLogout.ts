import { useAuthStore } from '@/store/auth.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../services/login';
import { toast } from 'sonner';

export function useLogout() {
	const queryClient = useQueryClient();
	const clearCredentials = useAuthStore((state) => state.clearCredentials);

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			clearCredentials();
			queryClient.clear();
			toast.success('Logout realizado com sucesso!');
		},
		onError: () => {
			clearCredentials();
			queryClient.clear();
			toast.error('Erro na API, mas você foi desconectado localmente.');
		},
	});
}
