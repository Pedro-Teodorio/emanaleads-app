'use client';

import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../services/login';
import { toast } from 'sonner';
import { ForgotPasswordSchema } from '../schemas/forgotPasswordSchema';

export const useForgotPassword = () => {
	return useMutation({
		mutationFn: (data: ForgotPasswordSchema) => forgotPassword(data),
		onSuccess: () => {
			toast.success('Se o email existir, você receberá instruções para resetar sua senha');
		},
		onError: () => {
			toast.error('Erro ao processar solicitação. Tente novamente.');
		},
	});
};
