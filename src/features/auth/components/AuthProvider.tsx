'use client';

import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';

const FullPageLoader = () => {
    return <div className="grid place-items-center h-screen">Carregando...</div>;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const user = useAuthStore((state) => state.user);
    const status = useAuthStore((state) => state.status);
    const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);

    useEffect(() => {
        // Este efeito é executado no cliente após o zustand ter reidratado.
        if (status === 'pending') {
            if (!user) {
                // Se não houver usuário após a hidratação, não estamos autenticados.
                setUnauthenticated();
            }
            // Se HOUVER um usuário, o status já deve ser 'autenticado'
            // de ser persistido. Portanto, nenhum 'else' é necessário.
        }
    }, [user, status, setUnauthenticated]);

    if (status === 'pending') {
        return <FullPageLoader />;
    }

    return <>{children}</>;
};