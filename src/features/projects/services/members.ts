import { api } from '@/lib/api';

export interface ProjectUser {
	id: string;
	name: string;
	email: string;
	role: string;
}

export interface ProjectMember {
	id: string;
	userId: string;
	projectId: string;
	createdAt: string;
	user: ProjectUser;
}

export interface ProjectUsersResponse {
	admin: string;
	members: Array<{
		id: string;
		user: ProjectUser;
	}>;
}

export async function listProjectUsers(projectId: string) {
	const { data } = await api.get<ProjectUsersResponse>(`/projects/${projectId}/users`);
	return data;
}

export async function addProjectMember(projectId: string, userId: string) {
	const { data } = await api.post(`/projects/${projectId}/members`, { userId });
	return data;
}

export async function createAndAddMember(projectId: string, userData: { name: string; email: string; phone?: string; password?: string }) {
	const { data } = await api.post(`/projects/${projectId}/members/new`, userData);
	return data;
}

export async function removeProjectMember(projectId: string, memberId: string) {
	await api.delete(`/projects/${projectId}/members/${memberId}`);
}

export async function fetchMyProjects() {
	const { data } = await api.get('/projects/mine');
	return data;
}
