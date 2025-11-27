import { PaginationMeta } from '@/features/users/types/user';

export enum ProjectQueriesKeys {
	GET_PROJECT_LIST = 'GET_PROJECT_LIST',
	GET_RECENT_PROJECT_LIST = 'GET_RECENT_PROJECT_LIST',
}

export interface Project {
	id: string;
	name: string;
	description: string;
	status: 'PLANNING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
	createdAt: string;
	updatedAt: string;
	adminId: string;
	admin?: {
		id: string;
		name: string;
		email: string;
		role: string;
	};
}

export interface ProjectAPIResponse {
	data: Project[];
	meta: PaginationMeta;
}
