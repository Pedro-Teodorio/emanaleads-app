import z from 'zod';

export const projectFormSchema = z.object({
	name: z.string().min(3, 'O nome do projeto deve ter no mínimo 3 caracteres'),
	description: z.string().optional(),
	status: z.enum(['PLANNING', 'ACTIVE', 'PAUSED', 'COMPLETED']),
	adminId: z.uuid('Formato de UUID inválido para o ID do admin (adminId)'),
});

export type ProjectFormSchema = z.infer<typeof projectFormSchema>;
