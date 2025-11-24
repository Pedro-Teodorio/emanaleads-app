'use client'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { Role, useAuthStore } from '@/store/auth.store';
import { LogOut, Zap, FolderKanban } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/rbac';
import { useMyProjects } from '@/features/projects/hooks/useProjectMembers';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Project } from '@/features/projects/types/projects';

export function AppSidebar() {
    const currentUser = useAuthStore((state) => state.user);
    const pathname = usePathname();
    const router = useRouter();
    const { mutate: logout } = useLogout();
    const handleLogout = () => logout();
    const { data: myProjects } = useMyProjects();

    // Detecta projeto atual da URL
    const projectMatch = /\/projects\/([a-f0-9-]+)/.exec(pathname);
    const urlProjectId = projectMatch ? projectMatch[1] : '';

    // Se ADMIN tem projetos mas não está em rota de projeto, usa o primeiro
    const selectedProjectId = urlProjectId || (
        currentUser?.role === Role.ADMIN && myProjects?.data?.[0]?.id
            ? myProjects.data[0].id
            : ''
    );

    // Filter navigation items by current user role
    const navigationItems = NAV_ITEMS.filter((item) =>
        currentUser?.role && item.roles.includes(currentUser.role)
    );

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
                {/* Project Selector for ADMIN */}
                {currentUser?.role === Role.ADMIN && myProjects?.data && myProjects.data.length > 0 && (
                    <div className="px-3 mb-4">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            Projeto Atual
                        </div>
                        <Select
                            value={selectedProjectId}
                            onValueChange={(value) => {
                                router.push(`/projects/${value}/leads`);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione um projeto">
                                    {myProjects.data.find((p: Project) => p.id === selectedProjectId)?.name || "Selecione"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {myProjects.data.map((project: Project) => (
                                    <SelectItem key={project.id} value={project.id}>
                                        <div className="flex items-center gap-2">
                                            <FolderKanban className="w-4 h-4" />
                                            {project.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {currentUser?.role !== Role.ADMIN && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                            Navegação
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navigationItems.map((item) => (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton
                                            asChild
                                            className={`hover:bg-slate-100 transition-all duration-200 rounded-xl mb-1 ${pathname === item.href
                                                ? 'bg-blue-900 text-white hover:bg-blue-800 hover:text-white'
                                                : 'text-slate-600'
                                                }`}
                                        >
                                            <Link href={item.href} className="flex items-center gap-3 px-4 py-3">
                                                <item.icon className="w-5 h-5" />
                                                <span className="font-medium">{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                {/* Project Context Navigation for ADMIN when project is selected */}
                {currentUser?.role === Role.ADMIN && selectedProjectId && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                            Gerenciar Projeto
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        className={`hover:bg-slate-100 transition-all duration-200 rounded-xl mb-1 ${pathname.includes('/projects/' + selectedProjectId + '/leads')
                                            ? 'bg-blue-900 text-white hover:bg-blue-800 hover:text-white'
                                            : 'text-slate-600'
                                            }`}
                                    >
                                        <Link href={`/projects/${selectedProjectId}/leads`} className="flex items-center gap-3 px-4 py-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <span className="font-medium">Leads</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        className={`hover:bg-slate-100 transition-all duration-200 rounded-xl mb-1 ${pathname.includes('/projects/' + selectedProjectId + '/members')
                                            ? 'bg-blue-900 text-white hover:bg-blue-800 hover:text-white'
                                            : 'text-slate-600'
                                            }`}
                                    >
                                        <Link href={`/projects/${selectedProjectId}/members`} className="flex items-center gap-3 px-4 py-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            <span className="font-medium">Membros</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        className={`hover:bg-slate-100 transition-all duration-200 rounded-xl mb-1 ${pathname.includes('/projects/' + selectedProjectId + '/details')
                                            ? 'bg-blue-900 text-white hover:bg-blue-800 hover:text-white'
                                            : 'text-slate-600'
                                            }`}
                                    >
                                        <Link href={`/projects/${selectedProjectId}/details`} className="flex items-center gap-3 px-4 py-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            <span className="font-medium">Detalhes & Campanhas</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
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