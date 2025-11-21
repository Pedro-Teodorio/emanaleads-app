import { useAuthStore } from '@/store/auth.store';
import { ROLE_PERMISSIONS, type RolePermissions, type SystemRole } from '@/lib/rbac';

interface Lead {
	id: string;
	assignedUserId?: string | null;
	projectId: string;
}

interface Project {
	id: string;
	adminId: string;
}

interface OwnershipContext {
	lead?: Lead;
	project?: Project;
	userProjects?: Project[]; // Projetos administrados pelo user
	userMemberships?: string[]; // IDs de projetos onde user é membro
}

/**
 * Hook para verificar permissões do usuário atual
 * Retorna permissões estáticas (baseadas em role) e funções de validação dinâmica (ownership)
 */
export function usePermissions() {
	const { user } = useAuthStore();

	if (!user) {
		return {
			permissions: null,
			canEditLead: () => false,
			canDeleteLead: () => false,
			canManageProject: () => false,
			canEditProject: () => false,
			canCreateLeadInProject: () => false,
			isOwnProject: () => false,
			isAssignedLead: () => false,
		};
	}

	const role = user.role as SystemRole;
	const permissions: RolePermissions = ROLE_PERMISSIONS[role];

	/**
	 * Verifica se usuário pode editar um lead específico
	 * ROOT: sempre
	 * ADMIN: se o lead pertence a projeto que ele administra
	 * PROJECT_USER: se o lead está atribuído a ele
	 */
	const canEditLead = (context: OwnershipContext): boolean => {
		if (role === 'ROOT') return true;

		if (role === 'ADMIN' && context.lead && context.userProjects) {
			return context.userProjects.some((p) => p.id === context.lead!.projectId);
		}

		if (role === 'PROJECT_USER' && context.lead) {
			return context.lead.assignedUserId === user.id;
		}

		return false;
	};

	/**
	 * Verifica se usuário pode deletar um lead
	 * ROOT: sempre
	 * ADMIN: se o lead pertence a projeto que ele administra
	 * PROJECT_USER: nunca
	 */
	const canDeleteLead = (context: OwnershipContext): boolean => {
		if (role === 'ROOT') return true;

		if (role === 'ADMIN' && context.lead && context.userProjects) {
			return context.userProjects.some((p) => p.id === context.lead!.projectId);
		}

		return false;
	};

	/**
	 * Verifica se usuário pode gerenciar membros de um projeto
	 * ROOT: sempre
	 * ADMIN: se é o admin do projeto (adminId === userId)
	 */
	const canManageProject = (context: OwnershipContext): boolean => {
		if (role === 'ROOT') return true;

		if (role === 'ADMIN' && context.project) {
			return context.project.adminId === user.id;
		}

		return false;
	};

	/**
	 * Verifica se usuário pode editar um projeto
	 * ROOT: sempre
	 * ADMIN: se é o admin do projeto
	 */
	const canEditProject = (context: OwnershipContext): boolean => {
		return canManageProject(context);
	};

	/**
	 * Verifica se usuário pode criar lead em um projeto específico
	 * ROOT: sempre
	 * ADMIN: se é o admin do projeto
	 * PROJECT_USER: se é membro do projeto
	 */
	const canCreateLeadInProject = (projectId: string, context: OwnershipContext): boolean => {
		if (role === 'ROOT') return true;

		if (role === 'ADMIN' && context.userProjects) {
			return context.userProjects.some((p) => p.id === projectId);
		}

		if (role === 'PROJECT_USER' && context.userMemberships) {
			return context.userMemberships.includes(projectId);
		}

		return false;
	};

	/**
	 * Verifica se projeto pertence ao usuário (é admin)
	 */
	const isOwnProject = (project: Project): boolean => {
		return project.adminId === user.id;
	};

	/**
	 * Verifica se lead está atribuído ao usuário
	 */
	const isAssignedLead = (lead: Lead): boolean => {
		return lead.assignedUserId === user.id;
	};

	return {
		permissions,
		role,
		userId: user.id,
		canEditLead,
		canDeleteLead,
		canManageProject,
		canEditProject,
		canCreateLeadInProject,
		isOwnProject,
		isAssignedLead,
	};
}
