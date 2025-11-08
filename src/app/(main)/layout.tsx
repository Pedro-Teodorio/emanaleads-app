import { AppHeader } from '@/components/common/AppHeader';
import { AppSidebar } from '@/components/common/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <SidebarProvider >
                <div className="min-h-screen flex w-full bg-linear-to-br from-slate-50 to-slate-100">
                    <AppSidebar />
                    <main className="flex-1 flex flex-col">
                        <AppHeader />
                        <div className="flex-1 overflow-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </ProtectedRoute>
    );
}