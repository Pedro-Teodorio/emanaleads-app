'use client';

import { useMutation } from '@tanstack/react-query';
import { activateAccount } from '../services/login';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useActivateAccount = (token: string) => {
	const router = useRouter();

	return useMutation({
		mutationFn: (data: { password: string }) => activateAccount(token, data),
		onSuccess: () => {
			toast.success('Conta ativada com sucesso! Faça login com suas credenciais.');
			router.push('/login');
		},
		onError: (error: any) => {
			const message = error?.response?.data?.message || 'Token inválido ou expirado';
			toast.error(message);
		},
	});
};
