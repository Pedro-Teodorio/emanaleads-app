import { useMutation } from '@tanstack/react-query';
import { exportLeadsCSV, type ExportLeadsParams } from '../services/exportLeads';
import { toast } from 'sonner';
import axios from 'axios';

export function useExportLeads() {
	return useMutation({
		mutationFn: (params: ExportLeadsParams) => exportLeadsCSV(params),
		onSuccess: (filename) => {
			toast.success(`Exportação concluída: ${filename}`);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data?.message || 'Erro ao exportar leads');
			} else if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('Erro ao exportar leads');
			}
		},
	});
}
