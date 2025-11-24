import z from 'zod';

export const leadFormSchema = z
	.object({
		name: z.string().min(1, 'Nome é obrigatório'),
		email: z.email('Email inválido').optional().or(z.literal('')),
		phone: z.string().optional().or(z.literal('')),
		requestType: z.string().optional().or(z.literal('')),
		position: z.string().optional().or(z.literal('')),
	})
	.refine((data) => data.email || data.phone, {
		message: 'Informe pelo menos um contato: email ou telefone',
		path: ['email'],
	});

export type LeadFormSchema = z.infer<typeof leadFormSchema>;

// Schema para atualização de status
export const updateLeadStatusSchema = z
	.object({
		toStatus: z.string().min(1, 'Status é obrigatório'),
		reason: z
			.string()
			.min(2, 'Motivo deve ter ao menos 2 caracteres')
			.optional()
			.transform((val) => (val === '' ? undefined : val)),
	})
	.refine(
		(data) => {
			// Motivo obrigatório para status finais
			if ((data.toStatus === 'FECHADO_PERDIDO' || data.toStatus === 'FECHADO_GANHO') && !data.reason) {
				return false;
			}
			return true;
		},
		{
			message: 'Motivo é obrigatório para status final',
			path: ['reason'],
		},
	);

export type UpdateLeadStatusSchema = z.infer<typeof updateLeadStatusSchema>;
