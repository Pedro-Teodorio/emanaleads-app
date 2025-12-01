import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../services/login';
import { AuthKey } from './useCheckAuth';
import { toast } from 'sonner';
import axios from 'axios';
import { fetchUser } from '../services/user';
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
		onSuccess: async () => {
			try {
				const user = await fetchUser();
				setUser(user);
				queryClient.setQueryData([AuthKey.CHECK_AUTH], user);
				toast.success('Login realizado com sucesso!');

				// Redirecionamento pós-login baseado em role
				if (user.role === 'ADMIN') {
					try {
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
			} catch {
				toast.error('Login bem-sucedido, mas falha ao buscar seus dados.');
			}
		},

		onError: (error) => {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				toast.error('Email ou senha inválidos.');
			}

			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.errors[0].message);
			}
		},
	});
}
