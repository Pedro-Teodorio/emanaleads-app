import { api } from '@/lib/api';
import { Campaign, CampaignAPIResponse, CampaignFormData, CampaignMetrics } from '../types/campaign';
import axios from 'axios';

interface GetCampaignsParams {
	page?: number;
	limit?: number;
	search?: string;
}

export const fetchCampaigns = async (projectId: string, params: GetCampaignsParams = {}): Promise<CampaignAPIResponse> => {
	const queryParams = new URLSearchParams();
	queryParams.append('page', (params.page || 1).toString());
	queryParams.append('limit', (params.limit || 10).toString());
	if (params.search) {
		queryParams.append('search', params.search);
	}

	const { data } = await api.get(`/projects/${projectId}/campaigns?${queryParams.toString()}`);
	return data;
};

export const fetchCampaignById = async (projectId: string, campaignId: string): Promise<Campaign> => {
	const { data } = await api.get(`/projects/${projectId}/campaigns/${campaignId}`);
	return data;
};

export const createCampaign = async (projectId: string, campaign: CampaignFormData): Promise<Campaign> => {
	try {
		const { data } = await api.post(`/projects/${projectId}/campaigns`, campaign);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) throw error;
		throw error;
	}
};

export const updateCampaign = async (projectId: string, campaignId: string, campaign: Partial<CampaignFormData>): Promise<Campaign> => {
	try {
		const { data } = await api.put(`/projects/${projectId}/campaigns/${campaignId}`, campaign);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) throw error;
		throw error;
	}
};

export const deleteCampaign = async (projectId: string, campaignId: string): Promise<void> => {
	try {
		await api.delete(`/projects/${projectId}/campaigns/${campaignId}`);
	} catch (error) {
		if (axios.isAxiosError(error)) throw error;
		throw error;
	}
};

export const fetchCampaignMetrics = async (projectId: string): Promise<CampaignMetrics> => {
	const { data } = await api.get(`/projects/${projectId}/campaigns/metrics`);
	return data;
};
