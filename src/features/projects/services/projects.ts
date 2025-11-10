import { api } from '@/lib/api';
import { Project } from '../types/projects';
import { ProjectFormSchema } from '../schemas/projects';

export const fetchProjectsList = async (): Promise<Project[]> => {
	const { data } = await api.get('/projects');
	return data;
};

export const createProject = async (project: ProjectFormSchema): Promise<Project> => {
	const { data } = await api.post('/projects', project);
	return data;
};

export const updateProject = async (id: string, project: ProjectFormSchema): Promise<Project> => {
	const { data } = await api.put(`/projects/${id}`, project);
	return data;
};

export const deleteProject = async (id: string): Promise<void> => {
	await api.delete(`/projects/${id}`);
};
