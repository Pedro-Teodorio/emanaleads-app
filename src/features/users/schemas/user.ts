import z from 'zod';
import { optionalPasswordSchema } from '@/features/auth/schemas/passwordSchema';

export const userFormSchema = z.object({
	name: z.string().min(3, 'O nome precisa ter no mínimo 3 caracteres'),
	email: z.email('Email inválido'),
	phone: z.string().optional(),
	password: optionalPasswordSchema,
	role: z.enum(['ROOT', 'ADMIN', 'PROJECT_USER']),
	status: z.enum(['ACTIVE', 'INACTIVE']),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;
