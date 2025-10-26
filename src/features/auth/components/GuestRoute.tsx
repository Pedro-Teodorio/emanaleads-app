'use client';

import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export function GuestRoute({ children }: { children: ReactNode }) {
    const status = useAuthStore((state) => state.status);

    if (status === 'authenticated') {
        redirect('/dashboard');
    }

    if (status === 'unauthenticated') {
        return <>{children}</>;
    }
    return null;
}