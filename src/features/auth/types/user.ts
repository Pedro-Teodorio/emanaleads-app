export interface User {
	id: string;
	name: string;
	email: string;
	role: 'user' | 'admin' | 'manager' | 'root';
	createdAt: string;
	updatedAt: string;
}
