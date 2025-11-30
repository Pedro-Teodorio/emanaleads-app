import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
	token: string;
}

interface AuthState {
	user: User | null;
	status: 'authenticated' | 'unauthenticated' | 'pending';
	setUser: (user: User) => void;
	clearCredentials: () => void;
	setUnauthenticated: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			status: 'pending',
			setUser: (user: User) => set({ user, status: 'authenticated' }),
			clearCredentials: () => set({ user: null, status: 'unauthenticated' }),
			setUnauthenticated: () => set({ status: 'unauthenticated' }),
		}),
		{
			name: 'auth-storage', // name of the item in the storage (must be unique)
		},
	),
);
