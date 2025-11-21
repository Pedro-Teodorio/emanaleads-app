import { api } from '@/lib/api';
import { type Lead, type LeadDetail, type LeadAPIResponse } from '../types/leads';
import { type LeadStatus } from '@/lib/rbac';

interface FetchLeadsListParams {
	page?: number;
	limit?: number;
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

export const fetchLeadsList = async (params: FetchLeadsListParams): Promise<LeadAPIResponse> => {
	const queryParams = new URLSearchParams();

	queryParams.append('page', (params.page || 1).toString());
	queryParams.append('limit', (params.limit || 10).toString());

	if (params.search) queryParams.append('search', params.search);
	if (params.projectId) queryParams.append('projectId', params.projectId);
	if (params.status) queryParams.append('status', params.status);
	if (params.statuses) queryParams.append('statuses', params.statuses);
	if (params.assignedUserId) queryParams.append('assignedUserId', params.assignedUserId);
	if (params.unassigned) queryParams.append('unassigned', params.unassigned);
	if (params.requestType) queryParams.append('requestType', params.requestType);
	if (params.position) queryParams.append('position', params.position);
	if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
	if (params.dateTo) queryParams.append('dateTo', params.dateTo);
	if (params.orderBy) queryParams.append('orderBy', params.orderBy);
	if (params.order) queryParams.append('order', params.order);

	const { data } = await api.get(`/leads?${queryParams.toString()}`);
	return data;
};

export const fetchLeadDetail = async (leadId: string): Promise<LeadDetail> => {
	const { data } = await api.get(`/leads/${leadId}`);
	return data;
};

interface CreateLeadData {
	name: string;
	email?: string;
	phone?: string;
	position?: string;
	requestType?: string;
	projectId: string;
	assignedUserId?: string;
	status?: LeadStatus;
}

export const createLead = async (leadData: CreateLeadData): Promise<Lead> => {
	const { data } = await api.post('/leads', leadData);
	return data;
};

interface UpdateLeadData {
	name?: string;
	email?: string | null;
	phone?: string | null;
	position?: string | null;
	requestType?: string | null;
	assignedUserId?: string | null;
}

export const updateLead = async (leadId: string, leadData: UpdateLeadData): Promise<Lead> => {
	const { data } = await api.put(`/leads/${leadId}`, leadData);
	return data;
};

interface UpdateLeadStatusData {
	toStatus: LeadStatus;
	reason?: string;
}

export const updateLeadStatus = async (leadId: string, statusData: UpdateLeadStatusData): Promise<Lead> => {
	const { data } = await api.patch(`/leads/${leadId}/status`, statusData);
	return data;
};

export const deleteLead = async (leadId: string): Promise<void> => {
	await api.delete(`/leads/${leadId}`);
};
