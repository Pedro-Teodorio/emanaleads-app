// src/app/(main)/layout.tsx
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'; // 1. Importe

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}