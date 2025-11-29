'use client';

import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../services/login';
import { toast } from 'sonner';

export const useChangePassword = () => {
	return useMutation({
		mutationFn: (data: { currentPassword: string; newPassword: string }) => changePassword(data),
		onSuccess: () => {
			toast.success('Senha alterada com sucesso!');
		},
		onError: (error: any) => {
			const message = error?.response?.data?.message || 'Erro ao alterar senha';
			toast.error(message);
		},
	});
};
