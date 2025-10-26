'use client';
import { useAuthStore } from '@/store/auth.store';

export default function DashboardPage() {
  const user = useAuthStore(state => state.user);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard!</h1>
        {user ? (
          <p className="mb-6">Logado como: <strong>{user.email}</strong></p>
        ) : (
          <p className="mb-6">Carregando dados do usuário...</p>
        )}
      </div>
    </div>
  );
}
