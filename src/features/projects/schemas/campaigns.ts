import { z } from 'zod';

export const campaignFormSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	monthPayment: z.number().min(1, 'Mês de pagamento deve ser entre 1 e 12').max(12, 'Mês de pagamento deve ser entre 1 e 12'),
	yearPayment: z.number().min(2020, 'Ano de pagamento deve ser maior que 2020'),
	monthCampaign: z.number().min(1, 'Mês da campanha deve ser entre 1 e 12').max(12, 'Mês da campanha deve ser entre 1 e 12'),
	yearCampaign: z.number().min(2020, 'Ano da campanha deve ser maior que 2020'),
	clicks: z.number().min(0, 'Cliques não pode ser negativo'),
	conversions: z.number().min(0, 'Conversões não pode ser negativo'),
	qualified: z.number().min(0, 'Qualificados não pode ser negativo'),
	sales: z.number().min(0, 'Vendas não pode ser negativo'),
	investmentGoogleAds: z.number().min(0, 'Investimento Google Ads não pode ser negativo'),
	investmentTotal: z.number().min(0, 'Investimento Total não pode ser negativo'),
	approvalsRate: z.number().min(0).max(100).optional().nullable(),
	goalQualifiedConv: z.number().min(0).optional().nullable(),
});

export type CampaignFormSchema = z.infer<typeof campaignFormSchema>;
