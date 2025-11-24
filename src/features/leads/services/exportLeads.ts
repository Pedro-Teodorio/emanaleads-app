import { api } from '@/lib/api';
import axios from 'axios';

export interface ExportLeadsParams {
	search?: string;
	statuses?: string;
	projectId?: string;
	unassigned?: 'true' | 'false';
	requestType?: string;
	position?: string;
	dateFrom?: string;
	dateTo?: string;
	orderBy?: 'createdAt' | 'updatedAt' | 'name';
	order?: 'asc' | 'desc';
	assignedUserId?: string; // Em caso de PROJECT_USER
}

// Faz chamada ao endpoint de exportação e retorna o nome do arquivo utilizado
export async function exportLeadsCSV(params: ExportLeadsParams): Promise<string> {
	const queryParams = new URLSearchParams();
	const map: Record<string, string | undefined> = {
		search: params.search,
		statuses: params.statuses,
		projectId: params.projectId,
		unassigned: params.unassigned,
		requestType: params.requestType,
		position: params.position,
		dateFrom: params.dateFrom,
		dateTo: params.dateTo,
		orderBy: params.orderBy,
		order: params.order,
		assignedUserId: params.assignedUserId,
	};
	for (const [key, value] of Object.entries(map)) {
		if (value) queryParams.append(key, value);
	}

	try {
		const response = await api.get(`/leads/export?${queryParams.toString()}`, { responseType: 'blob' });

		// Tenta extrair nome de arquivo do header Content-Disposition
		const disposition = response.headers['content-disposition'];
		let filename = 'leads-export.csv';
		if (disposition) {
			const regex = /filename="?([^";]+)"?/i;
			const match = regex.exec(disposition);
			if (match?.[1]) {
				filename = match[1];
			}
		}

		// Cria objeto para download
		const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
		const url = globalThis.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		link.remove();
		globalThis.URL.revokeObjectURL(url);

		return filename;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data?.message || 'Erro ao exportar CSV');
		}
		throw new Error('Erro ao exportar CSV');
	}
}
