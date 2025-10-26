import { GuestRoute } from '@/features/auth/components/GuestRoute'; 

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GuestRoute>
            {children}
        </GuestRoute>
    );
}