import { z } from 'zod';
import { passwordSchema } from './passwordSchema';

export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
		newPassword: passwordSchema,
		confirmPassword: z.string().min(1, 'Confirme a nova senha'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: 'A nova senha deve ser diferente da senha atual',
		path: ['newPassword'],
	});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
