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
	status: string;
	createdAt: string;
}
