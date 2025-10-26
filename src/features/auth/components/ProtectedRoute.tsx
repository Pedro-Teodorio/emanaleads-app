// src/features/auth/components/ProtectedRoute.tsx
'use client';

import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const status = useAuthStore((state) => state.status);
    
    if (status === 'authenticated') {
        return <>{children}</>;
    }

    if (status === 'unauthenticated') {
        redirect('/login');
    }
    return null;
}