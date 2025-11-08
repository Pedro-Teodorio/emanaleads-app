'use client'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { Role, useAuthStore } from '@/store/auth.store';
import { FolderKanban, LayoutDashboard, LogOut, Users, Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function AppSidebar() {
    const navigationItems = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Usuários",
            url: "/users",
            icon: Users,
        },
        {
            title: "Projetos",
            url: "/projects",
            icon: FolderKanban,
        },
    ];
    const currentUser = useAuthStore((state) => state.user);
    const pathname = usePathname();
    const { mutate: logout } = useLogout();
    const handleLogout = () => logout();

    const getRoleBadgeColor = (role: Role) => {
        switch (role) {
            case Role.ROOT:
                return "bg-purple-500";
            case Role.ADMIN:
                return "bg-blue-500";
            case Role.PROJECT_USER:
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };
    return (
        <Sidebar className="border-r border-slate-200 bg-white">
            <SidebarHeader className="border-b border-slate-200 p-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg  bg-blue-700">
                        <Zap className='text-white size-4' />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900 text-lg">Emanaleads</h2>
                        <p className="text-xs text-slate-500">Sistema CRM</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-3">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                        Navegação
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`hover:bg-slate-100 transition-all duration-200 rounded-xl mb-1 ${pathname === item.url
                                            ? 'bg-blue-900 text-white hover:bg-blue-800 hover:text-white'
                                            : 'text-slate-600'
                                            }`}
                                    >
                                        <Link href={item.url} className="flex items-center gap-3 px-4 py-3">
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-slate-200 p-4">
                {currentUser && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                                <span className="text-white font-semibold text-sm">
                                    {currentUser.name?.[0]?.toUpperCase() || 'U'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0 flex gap-2 align-center">
                                <p className="font-semibold text-slate-900 text-sm truncate">
                                    {currentUser.name || currentUser.email}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${getRoleBadgeColor(currentUser.role)}`}>
                                        {currentUser.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            Sair
                        </button>
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    )
}