import { z } from 'zod';
import { passwordSchema } from './passwordSchema';

export const resetPasswordSchema = z
	.object({
		newPassword: passwordSchema,
		confirmPassword: z.string().min(1, 'Confirme a nova senha'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
