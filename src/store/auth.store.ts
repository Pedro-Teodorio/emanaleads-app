import { create } from 'zustand';

export enum Role {
	ROOT = 'ROOT',
	ADMIN = 'ADMIN',
	PROJECT_USER = 'PROJECT_USER',
}

interface User {
	id: string;
	name: string;
	email: string;
	role: Role;
}

interface AuthState {
	user: User | null;
	status: 'authenticated' | 'unauthenticated' | 'pending';
	setUser: (user: User) => void;
	clearCredentials: () => void;
	setUnauthenticated: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	status: 'pending',
	setUser: (user: User) => set(() => ({ user, status: 'authenticated' })),
	clearCredentials: () => set(() => ({ user: null, status: 'unauthenticated' })),
	setUnauthenticated: () => set(() => ({ status: 'unauthenticated' })),
}));
