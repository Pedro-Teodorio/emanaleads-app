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
	approvalsRate?: number;
	goalQualifiedConv?: number;
	createdAt: string;
	updatedAt: string;
}

export interface CampaignAPIResponse {
	data: Campaign[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export interface CampaignFormData {
	name: string;
	monthPayment: number;
	yearPayment: number;
	monthCampaign: number;
	yearCampaign: number;
	clicks?: number;
	conversions?: number;
	qualified?: number;
	sales?: number;
	investmentGoogleAds?: number;
	investmentTotal?: number;
	approvalsRate?: number;
	goalQualifiedConv?: number;
}

export interface CampaignMetrics {
	totalCampaigns: number;
	totalClicks: number;
	totalConversions: number;
	totalQualified: number;
	totalSales: number;
	totalInvestment: number;
	averageConversionRate: number;
	averageApprovalRate: number;
	monthlySeries: {
		month: string;
		clicks: number;
		conversions: number;
		sales: number;
		investment: number;
	}[];
}
