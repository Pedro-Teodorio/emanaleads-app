import { api } from '@/lib/api';
import { Project } from '../types/projects';

export interface ProjectMetrics {
	totalMembers: number;
	totalCampaigns: number;
	totalLeads: number;
	leadsStatusDistribution: {
		status: string;
		count: number;
	}[];
	campaignsOverview: {
		totalClicks: number;
		totalConversions: number;
		totalSales: number;
		totalInvestment: number;
	};
}

export const getProjectById = async (projectId: string): Promise<Project | null> => {
	try {
		const { data } = await api.get(`/projects/${projectId}`);
		return data;
	} catch (error) {
		return null;
	}
};

export const getProjectCampaigns = async (projectId: string) => {
	try {
		const { data } = await api.get(`/projects/${projectId}/campaigns`);
		return data;
	} catch (error) {
		return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
	}
};

export const getProjectMetrics = async (projectId: string): Promise<ProjectMetrics | null> => {
	try {
		const { data } = await api.get(`/projects/${projectId}/metrics`);
		return data;
	} catch (error) {
		return null;
	}
};
