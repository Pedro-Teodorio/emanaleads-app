import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../services/login';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { fetchMyProjects } from '@/features/projects/services/members';
import { DEFAULT_ROUTES, type SystemRole } from '@/lib/rbac';

export function useLogin() {
	const queryClient = useQueryClient();
	const setUser = useAuthStore((state) => state.setUser);
	const router = useRouter();

	return useMutation({
		mutationFn: login,
		onSuccess: async (data) => {
			try {
				const { user, token } = data;
				setUser({ ...user, token });
				queryClient.invalidateQueries(); // Invalidate all queries to refetch data with new auth state
				toast.success('Login realizado com sucesso!');

				// Redirecionamento pós-login baseado em role
				if (user.role === 'ADMIN') {
					try {
						// We need to ensure the new token is used for this request.
						// The interceptor handles this, but we can pre-fetch to direct.
						const projects = await fetchMyProjects();
						const firstId = projects?.data?.[0]?.id;
						const target = firstId ? `/projects/${firstId}/leads` : '/projects';
						router.push(target);
					} catch {
						router.push('/projects');
					}
				} else {
					const target = DEFAULT_ROUTES[user.role as SystemRole] || '/dashboard';
					router.push(target);
				}
			} catch (e) {
				toast.error('Login bem-sucedido, mas falha ao redirecionar.');
				console.error(e);
			}
		},

		onError: (error) => {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				toast.error('Email ou senha inválidos.');
			} else if (axios.isAxiosError(error) && error.response?.data?.errors?.[0]?.message) {
				toast.error(error.response.data.errors[0].message);
			} else {
				toast.error('Ocorreu um erro ao tentar fazer o login.');
			}
		},
	});
}
