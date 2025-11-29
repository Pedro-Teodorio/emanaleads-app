import { z } from 'zod';
import { passwordSchema } from './passwordSchema';

export const activateAccountSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: z.string().min(1, 'Confirme a senha'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	});

export type ActivateAccountSchema = z.infer<typeof activateAccountSchema>;
