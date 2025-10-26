import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'manager' | 'root';
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
