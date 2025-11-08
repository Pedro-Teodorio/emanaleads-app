
export const roleConfig = {
	ROOT: { label: 'Root', color: 'bg-purple-100 text-purple-800 border-purple-200' },
	ADMIN: { label: 'Admin', color: 'bg-blue-100 text-blue-800 border-blue-200' },
	PROJECT_USER: { label: 'Membro', color: 'bg-green-100 text-green-800 border-green-200' },
};

export interface User {
	id: string;
	name: string;
	email: string;
	phone: string;
	createdAt: string;
	role: keyof typeof roleConfig;
	status: 'ACTIVE' | 'INACTIVE';
}

export const users: User[] = [
	{
		id: '1',
		name: 'Pedro',
		email: 'pedro@example.com',
		role: 'ADMIN',
		phone: '1234567890',
		createdAt: '2023-01-01',
		status: 'ACTIVE',
	},
	{
		id: '2',
		name: 'João',
		email: 'joao@example.com',
		role: 'PROJECT_USER',
		phone: '0987654321',
		createdAt: '2023-02-01',
		status: 'INACTIVE',
	},
	{
		id: '3',
		name: 'Maria',
		email: 'maria@example.com',
		role: 'PROJECT_USER',
		phone: '1122334455',
		createdAt: '2023-03-01',
		status: 'ACTIVE',
	},
	{
		id: '4',
		name: 'Root',
		email: 'root@example.com',
		role: 'ROOT',
		phone: '1234567890',
		createdAt: '2023-04-01',
		status: 'ACTIVE',
	},
    {
        id: '5',
        name: 'Test User',
        email: 'test@example.com',
        role: 'PROJECT_USER',
        phone: '1234567890',
        createdAt: '2023-05-01',
        status: 'ACTIVE',
    },
    {
        id: '6',
        name: 'Test User 2',
        email: 'test2@example.com',
        role: 'PROJECT_USER',
        phone: '1234567890',
        createdAt: '2023-06-01',
        status: 'INACTIVE',
    },
];
