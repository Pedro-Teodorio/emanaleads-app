import { type PaginationMeta } from '@/features/users/types/user';

export enum CampaignQueriesKeys {
	GET_CAMPAIGN_LIST = 'GET_CAMPAIGN_LIST',
	GET_CAMPAIGN_DETAIL = 'GET_CAMPAIGN_DETAIL',
}

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

export interface CampaignAPIResponse {
	data: Campaign[];
	meta: PaginationMeta;
}
