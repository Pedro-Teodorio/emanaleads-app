'use client';

import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../services/login';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useResetPassword = (token: string) => {
	const router = useRouter();

	return useMutation({
		mutationFn: (data: { newPassword: string }) => resetPassword(token, data),
		onSuccess: () => {
			toast.success('Senha resetada com sucesso! Faça login com sua nova senha.');
			router.push('/login');
		},
		onError: (error: any) => {
			const message = error?.response?.data?.message || 'Token inválido ou expirado';
			toast.error(message);
		},
	});
};
