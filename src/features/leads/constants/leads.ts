import { type LeadStatus } from '@/lib/rbac';

export const leadStatusConfig: Record<
	LeadStatus,
	{
		label: string;
		color: string;
		description?: string;
	}
> = {
	PRIMEIRO_CONTATO: {
		label: 'Primeiro Contato',
		color: 'bg-gray-100 text-gray-800 border-gray-200',
		description: 'Lead recém-cadastrado, aguardando primeiro contato',
	},
	REUNIAO: {
		label: 'Reunião',
		color: 'bg-blue-100 text-blue-800 border-blue-200',
		description: 'Reunião agendada ou realizada',
	},
	PROPOSTA_ENVIADA: {
		label: 'Proposta Enviada',
		color: 'bg-purple-100 text-purple-800 border-purple-200',
		description: 'Proposta comercial enviada ao lead',
	},
	ANALISE_PROPOSTA: {
		label: 'Análise da Proposta',
		color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
		description: 'Lead analisando proposta enviada',
	},
	FECHADO_GANHO: {
		label: 'Fechado - Ganho',
		color: 'bg-green-100 text-green-800 border-green-200',
		description: 'Negócio fechado com sucesso',
	},
	FECHADO_PERDIDO: {
		label: 'Fechado - Perdido',
		color: 'bg-red-100 text-red-800 border-red-200',
		description: 'Lead perdido, negócio não concretizado',
	},
};
