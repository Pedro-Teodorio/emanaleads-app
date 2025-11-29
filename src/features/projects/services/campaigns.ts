import { api } from '@/lib/api';

export interface Campaign {
	id: string;
	projectId: string;
	name: string;
	monthPayment: number;
	yearPayment: number;
	monthCampaign: number;
	yearCampaign: number;
	clicks: number;
	conversions: number;
	qualified: number;
	sales: number;
	investmentGoogleAds: number;
	investmentTotal: number;
	approvalsRate?: number | null;
	goalQualifiedConv?: number | null;
	createdAt: string;
	updatedAt: string;
}

export interface CampaignListResponse {
	data: Campaign[];
	meta: { total: number; page: number; limit: number; totalPages: number };
}

export async function listCampaigns(projectId: string, params?: { page?: number; limit?: number; search?: string; year?: number; month?: number }) {
	const qp = new URLSearchParams();
	if (params?.page) qp.set('page', String(params.page));
	if (params?.limit) qp.set('limit', String(params.limit));
	if (params?.search) qp.set('search', params.search);
	if (params?.year) qp.set('year', String(params.year));
	if (params?.month) qp.set('month', String(params.month));
	const { data } = await api.get<CampaignListResponse>(`/projects/${projectId}/campaigns?${qp.toString()}`);
	return data;
}

export async function getCampaign(projectId: string, campaignId: string) {
	const { data } = await api.get<Campaign>(`/projects/${projectId}/campaigns/${campaignId}`);
	return data;
}

export async function createCampaign(projectId: string, payload: Omit<Campaign, 'id' | 'projectId' | 'createdAt' | 'updatedAt'>) {
	const { data } = await api.post<Campaign>(`/projects/${projectId}/campaigns`, payload);
	return data;
}

export async function updateCampaign(projectId: string, campaignId: string, payload: Partial<Omit<Campaign, 'id' | 'projectId' | 'createdAt' | 'updatedAt'>>) {
	const { data } = await api.put<Campaign>(`/projects/${projectId}/campaigns/${campaignId}`, payload);
	return data;
}

export async function deleteCampaign(projectId: string, campaignId: string) {
	await api.delete<void>(`/projects/${projectId}/campaigns/${campaignId}`);
}
