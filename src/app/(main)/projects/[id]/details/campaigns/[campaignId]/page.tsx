"use client";

import CampaignChart from "@/components/common/charts/CampaignChart";
import { PageContainer, PageContent, PageHeader, PageTitle, PageDescription } from "@/components/common/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { campaignsQueries } from "@/features/projects/services/campaignQueries";
import { formatCurrency, formatNumber, formatPercent, formatMonth } from "@/features/projects/constants/campaigns";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MousePointerClick, TrendingUp, Target, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface CampaignDetailsPageProps {
    params: Promise<{ id: string; campaignId: string }>;
}

export default function CampaignDetailsPage({ params }: CampaignDetailsPageProps) {
    const { id: projectId, campaignId } = use(params);

    const { data: campaign, isLoading } = useQuery(
        campaignsQueries.detail(projectId, campaignId)
    );

    if (isLoading) {
        return (
            <PageContainer>
                <PageHeader>
                    <div className="flex flex-col gap-2">
                        <PageTitle>Carregando...</PageTitle>
                    </div>
                </PageHeader>
            </PageContainer>
        );
    }

    if (!campaign) {
        return (
            <PageContainer>
                <PageHeader>
                    <div className="flex flex-col gap-2">
                        <PageTitle>Campanha não encontrada</PageTitle>
                    </div>
                </PageHeader>
            </PageContainer>
        );
    }

    // Chart labels for different metrics visualization
    const metricsLabels = ["Cliques", "Conversões", "Qualificados", "Vendas"];
    const metricsData = [campaign.clicks, campaign.conversions, campaign.qualified, campaign.sales];

    const investmentLabels = ["Google Ads", "Total"];
    const investmentData = [campaign.investmentGoogleAds, campaign.investmentTotal];

    return (
        <PageContainer>
            <PageHeader>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={`/projects/${projectId}/details/campaigns`}>
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </Button>
                        <PageTitle>{campaign.name}</PageTitle>
                    </div>
                    <PageDescription>
                        Campanha de {formatMonth(campaign.monthCampaign)}/{campaign.yearCampaign}
                    </PageDescription>
                </div>
            </PageHeader>
            <PageContent>
                {/* Period Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                <span>Período da Campanha</span>
                            </div>
                            <p className="text-xl font-bold text-slate-900 mt-1">
                                {formatMonth(campaign.monthCampaign)}/{campaign.yearCampaign}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                <span>Período de Pagamento</span>
                            </div>
                            <p className="text-xl font-bold text-slate-900 mt-1">
                                {formatMonth(campaign.monthPayment)}/{campaign.yearPayment}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MousePointerClick className="w-4 h-4" />
                                <span>Cliques</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                {formatNumber(campaign.clicks)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <TrendingUp className="w-4 h-4" />
                                <span>Conversões</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                {formatNumber(campaign.conversions)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Target className="w-4 h-4" />
                                <span>Qualificados</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                {formatNumber(campaign.qualified)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <DollarSign className="w-4 h-4" />
                                <span>Vendas</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                {formatNumber(campaign.sales)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Investment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="text-sm text-slate-500">Investimento Google Ads</div>
                            <p className="text-xl font-bold text-slate-900 mt-1">
                                {formatCurrency(campaign.investmentGoogleAds)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="text-sm text-slate-500">Investimento Total</div>
                            <p className="text-xl font-bold text-slate-900 mt-1">
                                {formatCurrency(campaign.investmentTotal)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="text-sm text-slate-500">Taxa de Aprovação</div>
                            <p className="text-xl font-bold text-slate-900 mt-1">
                                {formatPercent(campaign.approvalsRate)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg">Métricas de Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CampaignChart
                                kind="bar"
                                title=""
                                labels={metricsLabels}
                                datasets={[
                                    {
                                        label: "Quantidade",
                                        data: metricsData,
                                        backgroundColor: "rgba(99,102,241,0.6)",
                                        borderColor: "#6366f1",
                                    },
                                ]}
                            />
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg">Investimentos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CampaignChart
                                kind="bar"
                                title=""
                                labels={investmentLabels}
                                datasets={[
                                    {
                                        label: "Valor (R$)",
                                        data: investmentData,
                                        backgroundColor: "rgba(16,185,129,0.6)",
                                        borderColor: "#10b981",
                                    },
                                ]}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Goal Info */}
                {campaign.goalQualifiedConv && (
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-slate-500">Meta de Conversões Qualificadas</div>
                                    <p className="text-xl font-bold text-slate-900 mt-1">
                                        {formatNumber(campaign.goalQualifiedConv)}
                                    </p>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500">Atingido</div>
                                    <p className="text-xl font-bold text-slate-900 mt-1">
                                        {campaign.goalQualifiedConv > 0 
                                            ? formatPercent((campaign.qualified / campaign.goalQualifiedConv) * 100)
                                            : '-'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </PageContent>
        </PageContainer>
    );
}
