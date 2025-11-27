import { z } from 'zod';

export const campaignFormSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	monthPayment: z.number().int().min(1).max(12, 'Mês de pagamento inválido'),
	yearPayment: z.number().int().min(2000, 'Ano de pagamento inválido'),
	monthCampaign: z.number().int().min(1).max(12, 'Mês da campanha inválido'),
	yearCampaign: z.number().int().min(2000, 'Ano da campanha inválido'),
	clicks: z.number().int().min(0),
	conversions: z.number().int().min(0),
	qualified: z.number().int().min(0),
	sales: z.number().int().min(0),
	investmentGoogleAds: z.number().min(0),
	investmentTotal: z.number().min(0),
	approvalsRate: z.number().min(0).max(100).optional(),
	goalQualifiedConv: z.number().min(0).max(100).optional(),
});

export type CampaignFormSchema = z.infer<typeof campaignFormSchema>;
