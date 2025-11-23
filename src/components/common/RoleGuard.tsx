'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { DEFAULT_ROUTES, type SystemRole } from '@/lib/rbac';

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles?: SystemRole[];
    redirectTo?: string;
}

/**
 * Guarda de navegação baseado em role
 * Redireciona usuários não autorizados para rota apropriada
 */
export function RoleGuard({ children, allowedRoles, redirectTo }: RoleGuardProps) {
    const router = useRouter();
    // Seletores individuais para evitar recriação de objeto e loops
    const user = useAuthStore((state) => state.user);
    const status = useAuthStore((state) => state.status);

    useEffect(() => {
        if (status === 'pending') return;

        if (status === 'unauthenticated') {
            router.push('/login');
            return;
        }

        if (user && allowedRoles && !allowedRoles.includes(user.role as SystemRole)) {
            // Redireciona para rota padrão do role do usuário
            const defaultRoute = redirectTo || DEFAULT_ROUTES[user.role as SystemRole] || '/dashboard';
            router.push(defaultRoute);
        }
    }, [user, status, allowedRoles, redirectTo, router]);

    // Mostrar loading enquanto verifica auth
    if (status === 'pending') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Não renderizar se usuário não tem permissão
    if (user && allowedRoles && !allowedRoles.includes(user.role as SystemRole)) {
        return null;
    }

    return <>{children}</>;
}

/**
 * Hook para redirecionar após login baseado em role
 */
export function useRoleRedirect() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    const redirectToDefault = () => {
        if (!user) return;
        const defaultRoute = DEFAULT_ROUTES[user.role as SystemRole] || '/dashboard';
        router.push(defaultRoute);
    };

    return { redirectToDefault };
}
