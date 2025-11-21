import { queryOptions } from '@tanstack/react-query';
import { LeadQueriesKeys } from '../types/leads';
import { fetchLeadsList, fetchLeadDetail } from './leads';
import { type LeadStatus } from '@/lib/rbac';

interface LeadListParams {
	page: number;
	limit: number;
	search?: string;
	projectId?: string;
	status?: LeadStatus;
	statuses?: string;
	assignedUserId?: string;
	unassigned?: 'true' | 'false';
	requestType?: string;
	position?: string;
	dateFrom?: string;
	dateTo?: string;
	orderBy?: 'createdAt' | 'updatedAt' | 'name';
	order?: 'asc' | 'desc';
}

export const leadsQueries = {
	list: (params: LeadListParams) =>
		queryOptions({
			queryKey: [LeadQueriesKeys.GET_LEAD_LIST, params],
			queryFn: () => fetchLeadsList(params),
			staleTime: 30 * 1000, // 30s
		}),

	detail: (leadId: string) =>
		queryOptions({
			queryKey: [LeadQueriesKeys.GET_LEAD_DETAIL, leadId],
			queryFn: () => fetchLeadDetail(leadId),
			staleTime: 15 * 1000, // 15s
		}),
};

// Re-export service functions for mutations
export { createLead, updateLead, updateLeadStatus, deleteLead } from './leads';
