'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { DEFAULT_ROUTES, type SystemRole } from '@/lib/rbac';
import { fetchMyProjects } from '@/features/projects/services/members';

interface GuestRouteProps { children: ReactNode }

export function GuestRoute({ children }: Readonly<GuestRouteProps>) {
    const status = useAuthStore((state) => state.status);
    const user = useAuthStore((state) => state.user);
    const router = useRouter();
    const didRedirectRef = useRef(false);

    useEffect(() => {
        if (didRedirectRef.current) return;
        if (status !== 'authenticated' || !user) return;

        const handleRedirect = async () => {
            if (user.role === 'ADMIN') {
                try {
                    const projects = await fetchMyProjects();
                    const firstId = projects?.data?.[0]?.id;
                    const target = firstId ? `/projects/${firstId}/leads` : '/projects';
                    router.push(target);
                } catch {
                    router.push('/projects');
                }
            } else {
                const target = DEFAULT_ROUTES[user.role as SystemRole] || '/dashboard';
                router.push(target);
            }
            didRedirectRef.current = true;
        };

        handleRedirect();
    }, [status, user, router]);

    // Mostra loading enquanto valida sessão
    if (status === 'pending') {
        return (
            <div className="grid place-items-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Mostra conteúdo da página guest apenas se não autenticado
    if (status === 'unauthenticated') {
        return <>{children}</>;
    }

    // Se autenticado, aguarda redirecionamento (não mostra nada)
    return null;
}