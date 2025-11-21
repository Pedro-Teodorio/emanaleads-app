/**
 * RBAC - Role-Based Access Control
 * Define permissões, rotas padrão e regras de negócio por perfil
 */

import { FolderKanban, LayoutDashboard, LucideIcon, SquareKanban, Users } from 'lucide-react';

export type SystemRole = 'ROOT' | 'ADMIN' | 'PROJECT_USER';

export type LeadStatus = 'PRIMEIRO_CONTATO' | 'REUNIAO' | 'PROPOSTA_ENVIADA' | 'ANALISE_PROPOSTA' | 'FECHADO_GANHO' | 'FECHADO_PERDIDO';

/**
 * Matriz de transições de status permitidas
 * Baseado em RF-060 e regras de negócio do backend
 */
export const ALLOWED_STATUS_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
	PRIMEIRO_CONTATO: ['REUNIAO', 'PROPOSTA_ENVIADA'],
	REUNIAO: ['PROPOSTA_ENVIADA'],
	PROPOSTA_ENVIADA: ['ANALISE_PROPOSTA', 'FECHADO_PERDIDO'],
	ANALISE_PROPOSTA: ['FECHADO_GANHO', 'FECHADO_PERDIDO'],
	FECHADO_GANHO: [],
	FECHADO_PERDIDO: [],
};

/**
 * Status finais que exigem campo 'reason' obrigatório
 */
export const FINAL_STATUSES: LeadStatus[] = ['FECHADO_GANHO', 'FECHADO_PERDIDO'];

/**
 * Permissões estáticas por perfil
 * Validações dinâmicas (ownership) são feitas em usePermissions hook
 */
export interface RolePermissions {
	// Módulo Users
	canAccessUsers: boolean;
	canCreateUser: boolean;
	canUpdateUser: boolean;
	canDeleteUser: boolean;

	// Módulo Projects
	canAccessAllProjects: boolean; // ROOT vê todos; ADMIN vê apenas adminId=self
	canCreateProject: boolean; // ROOT apenas (RF-030)
	canUpdateProject: boolean; // ROOT + ADMIN (com ownership)
	canDeleteProject: boolean; // ROOT apenas
	canManageMembers: boolean; // ROOT + ADMIN (com ownership)

	// Módulo Leads
	canAccessAllLeads: boolean; // ROOT vê todos
	canAccessProjectLeads: boolean; // ADMIN vê leads dos projetos administrados
	canAccessAssignedLeads: boolean; // PROJECT_USER vê apenas assignedUserId=self
	canCreateLead: boolean; // Todos (com validações específicas)
	canUpdateLead: boolean; // ROOT + ADMIN (ownership) + PROJECT_USER (se assigned)
	canDeleteLead: boolean; // ROOT + ADMIN (ownership)
	canUpdateLeadStatus: boolean; // Todos (com validações)
}

export const ROLE_PERMISSIONS: Record<SystemRole, RolePermissions> = {
	ROOT: {
		canAccessUsers: true,
		canCreateUser: true,
		canUpdateUser: true,
		canDeleteUser: true,
		canAccessAllProjects: true,
		canCreateProject: true,
		canUpdateProject: true,
		canDeleteProject: true,
		canManageMembers: true,
		canAccessAllLeads: true,
		canAccessProjectLeads: false,
		canAccessAssignedLeads: false,
		canCreateLead: true,
		canUpdateLead: true,
		canDeleteLead: true,
		canUpdateLeadStatus: true,
	},
	ADMIN: {
		canAccessUsers: false,
		canCreateUser: false,
		canUpdateUser: false,
		canDeleteUser: false,
		canAccessAllProjects: false, // Filtra por adminId=self
		canCreateProject: false,
		canUpdateProject: true, // Com ownership validation
		canDeleteProject: false,
		canManageMembers: true, // Com ownership validation
		canAccessAllLeads: false,
		canAccessProjectLeads: true, // Filtra por projectId IN adminOfProjects
		canAccessAssignedLeads: false,
		canCreateLead: true,
		canUpdateLead: true,
		canDeleteLead: true,
		canUpdateLeadStatus: true,
	},
	PROJECT_USER: {
		canAccessUsers: false,
		canCreateUser: false,
		canUpdateUser: false,
		canDeleteUser: false,
		canAccessAllProjects: false,
		canCreateProject: false,
		canUpdateProject: false,
		canDeleteProject: false,
		canManageMembers: false,
		canAccessAllLeads: false,
		canAccessProjectLeads: false,
		canAccessAssignedLeads: true, // Apenas assignedUserId=self
		canCreateLead: true, // Em projetos onde é membro
		canUpdateLead: false, // Apenas se assigned (validação dinâmica)
		canDeleteLead: false,
		canUpdateLeadStatus: true, // Apenas se assigned (validação dinâmica)
	},
};

/**
 * Rotas padrão após login por perfil
 */
export const DEFAULT_ROUTES: Record<SystemRole, string> = {
	ROOT: '/users',
	ADMIN: '/projects',
	PROJECT_USER: '/leads',
};

/**
 * Labels de navegação por perfil
 */
export const ROLE_LABELS: Record<SystemRole, string> = {
	ROOT: 'Root Admin',
	ADMIN: 'Administrador',
	PROJECT_USER: 'Membro',
};

/**
 * Estrutura de navegação condicional por role
 */
export interface NavItem {
	label: string;
	href: string;
	icon: LucideIcon;
	roles: SystemRole[];
}

export const NAV_ITEMS: NavItem[] = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		roles: ['ROOT', 'ADMIN', 'PROJECT_USER'],
		icon: LayoutDashboard,
	},
	{
		label: 'Usuários',
		href: '/users',
		roles: ['ROOT'],
		icon: Users,
	},
	{
		label: 'Projetos',
		href: '/projects',
		roles: ['ROOT', 'ADMIN'],
		icon: FolderKanban,
	},
	{
		label: 'Leads',
		href: '/leads',
		roles: ['ROOT', 'ADMIN', 'PROJECT_USER'],
		icon: SquareKanban,
	},
];

/**
 * Verifica se transição de status é permitida
 */
export function isStatusTransitionAllowed(from: LeadStatus, to: LeadStatus): boolean {
	return ALLOWED_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

/**
 * Verifica se status requer campo 'reason'
 */
export function requiresReason(status: LeadStatus): boolean {
	return FINAL_STATUSES.includes(status);
}

/**
 * Obtém próximos status permitidos
 */
export function getNextStatuses(currentStatus: LeadStatus): LeadStatus[] {
	return ALLOWED_STATUS_TRANSITIONS[currentStatus] || [];
}
