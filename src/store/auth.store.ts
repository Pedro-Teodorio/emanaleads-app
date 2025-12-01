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
	setToken: (token: string) => void;
	getToken: () => string | null;
	removeToken: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	status: 'pending',
	setUser: (user: User) => set(() => ({ user, status: 'authenticated' })),
	clearCredentials: () => {
		get().removeToken();
		set(() => ({ user: null, status: 'unauthenticated' }));
	},
	setUnauthenticated: () => set(() => ({ status: 'unauthenticated' })),
	setToken: (token: string) => {
		if (typeof globalThis.window !== 'undefined') {
			localStorage.setItem('auth-token', token);
		}
	},
	getToken: () => {
		if (typeof globalThis.window !== 'undefined') {
			return localStorage.getItem('auth-token');
		}
		return null;
	},
	removeToken: () => {
		if (typeof globalThis.window !== 'undefined') {
			localStorage.removeItem('auth-token');
		}
	},
}));
