import { api } from '@/lib/api';
import { Project, ProjectAPIResponse } from '../types/projects';
import { ProjectFormSchema } from '../schemas/projects';
import axios from 'axios';

interface GetProjectsParams {
	page?: number;
	limit?: number;
	search?: string;
	status?: string;
}

export const fetchProjectsList = async ({ page = 1, limit = 10, search, status }: GetProjectsParams): Promise<ProjectAPIResponse> => {
	const params = new URLSearchParams();
	params.append('page', page.toString());
	params.append('limit', limit.toString());
	if (search) {
		params.append('search', search);
	}
	if (status) {
		params.append('status', status);
	}

	const { data } = await api.get(`/projects?${params.toString()}`);
	return data;
};

export const listRecentProjects = async (): Promise<Project[]> => {
	const { data } = await api.get('/projects/recent');
	return data;
};

export const createProject = async (project: ProjectFormSchema): Promise<Project> => {
	try {
		const { data } = await api.post('/projects', project);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) throw error;
		throw error;
	}
};

export const updateProject = async (id: string, project: ProjectFormSchema): Promise<Project> => {
	try {
		const { data } = await api.put(`/projects/${id}`, project);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) throw error;
		throw error;
	}
};

export const deleteProject = async (id: string): Promise<void> => {
	try {
		await api.delete(`/projects/${id}`);
	} catch (error) {
		if (axios.isAxiosError(error)) throw error;
		throw error;
	}
};
