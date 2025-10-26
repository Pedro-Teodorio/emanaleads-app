// src/app/(main)/layout.tsx
import { AppHeader } from '@/components/common/AppHeader';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'; // 1. Importe

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <AppHeader />
            {children}
        </ProtectedRoute>
    );
}