import { type LeadStatus } from '@/lib/rbac';
import { type PaginationMeta } from '@/features/users/types/user';

export enum LeadQueriesKeys {
	GET_LEAD_LIST = 'GET_LEAD_LIST',
	GET_LEAD_DETAIL = 'GET_LEAD_DETAIL',
}

export interface Lead {
	id: string;
	name: string;
	email?: string ;
	phone?: string ;
	position?: string ;
	requestType?: string ;
	status: LeadStatus;
	projectId: string;
	assignedUserId?: string ;
	createdAt: string;
	updatedAt: string;
}

export interface LeadHistory {
	id: string;
	fromStatus?: LeadStatus | null;
	toStatus: LeadStatus;
	changedByUserId?: string | null;
	reason?: string | null;
	createdAt: string;
}

export interface LeadDetail extends Lead {
	history: LeadHistory[];
}

export interface LeadAPIResponse {
	data: Lead[];
	meta: PaginationMeta;
}
