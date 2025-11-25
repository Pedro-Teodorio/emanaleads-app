import { queryOptions } from '@tanstack/react-query';
import { CampaignQueriesKeys } from '../types/campaigns';
import { listCampaigns, getCampaign } from './campaigns';

interface CampaignListParams {
	projectId: string;
	page?: number;
	limit?: number;
	search?: string;
	year?: number;
	month?: number;
}

export const campaignsQueries = {
	list: ({ projectId, page, limit, search, year, month }: CampaignListParams) =>
		queryOptions({
			queryKey: [CampaignQueriesKeys.GET_CAMPAIGN_LIST, projectId, { page, limit, search, year, month }],
			queryFn: () => listCampaigns(projectId, { page, limit, search, year, month }),
			staleTime: 30 * 1000, // 30s
		}),

	detail: (projectId: string, campaignId: string) =>
		queryOptions({
			queryKey: [CampaignQueriesKeys.GET_CAMPAIGN_DETAIL, projectId, campaignId],
			queryFn: () => getCampaign(projectId, campaignId),
			staleTime: 15 * 1000, // 15s
		}),
};
