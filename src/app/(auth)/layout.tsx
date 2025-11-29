import { GuestRoute } from '@/features/auth/components/GuestRoute'; 

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GuestRoute>
            {children}
        </GuestRoute>
    );
}