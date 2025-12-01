'use client';

import { useCheckAuth } from '../hooks/useCheckAuth';

const FullPageLoader = () => {
    return <div className="grid place-items-center h-screen">Carregando...</div>;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { status } = useCheckAuth();

    if (status === 'pending') {
        return <FullPageLoader />;
    }

    return <>{children}</>;
};