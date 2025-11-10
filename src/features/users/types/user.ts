export enum UserQueriesKeys {
	GET_USER_LIST = 'getUserList',
}
export enum UserRole {
	ROOT = 'ROOT',
	ADMIN = 'ADMIN',
	PROJECT_USER = 'PROJECT_USER',
}

export interface User {
	id: string;
	name: string;
	email: string;
	phone: string;
	role: UserRole;
	status: 'ACTIVE' | 'INACTIVE';
	createdAt: string;
}

export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface UserAPIResponse {
	data: User[];
	meta: PaginationMeta;
}
