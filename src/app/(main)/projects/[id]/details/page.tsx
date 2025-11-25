"use client";

import CampaignChart from "@/components/common/charts/CampaignChart";
import { PageContainer, PageContent, PageHeader, PageTitle, PageDescription, PageActions } from "@/components/common/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { campaignsQueries } from "@/features/projects/services/campaignQueries";
import { formatCurrency, formatNumber, formatPercent, formatMonth } from "@/features/projects/constants/campaigns";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, MousePointerClick, TrendingUp, Target, DollarSign, BarChart3, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface ProjectDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
    const { id: projectId } = use(params);

    // Fetch last 12 campaigns for metrics
    const { data: campaignsData, isLoading } = useQuery(
        campaignsQueries.list({
            projectId,
            page: 1,
            limit: 12,
        })
    );

    const campaigns = campaignsData?.data || [];

    // Calculate aggregated metrics
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const totalQualified = campaigns.reduce((sum, c) => sum + c.qualified, 0);
    const totalSales = campaigns.reduce((sum, c) => sum + c.sales, 0);
    const totalInvestmentGoogleAds = campaigns.reduce((sum, c) => sum + c.investmentGoogleAds, 0);
    const totalInvestmentTotal = campaigns.reduce((sum, c) => sum + c.investmentTotal, 0);
    
    // Calculate average only for campaigns with valid approvalsRate
    const campaignsWithRate = campaigns.filter(c => c.approvalsRate !== null && c.approvalsRate !== undefined);
    const avgApprovalsRate = campaignsWithRate.length > 0
        ? campaignsWithRate.reduce((sum, c) => sum + (c.approvalsRate ?? 0), 0) / campaignsWithRate.length
        : null;

    // Prepare chart data (ordered by date)
    const sortedCampaigns = [...campaigns].sort((a, b) => {
        const dateA = a.yearCampaign * 12 + a.monthCampaign;
        const dateB = b.yearCampaign * 12 + b.monthCampaign;
        return dateA - dateB;
    });

    const chartLabels = sortedCampaigns.map(c => `${formatMonth(c.monthCampaign).slice(0, 3)}/${c.yearCampaign}`);
    const conversionsData = sortedCampaigns.map(c => c.conversions);
    const clicksData = sortedCampaigns.map(c => c.clicks);
    const qualifiedData = sortedCampaigns.map(c => c.qualified);
    const investmentData = sortedCampaigns.map(c => c.investmentGoogleAds);

    return (
        <PageContainer>
            <PageHeader>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/projects">
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </Button>
                        <PageTitle>Detalhes do Projeto</PageTitle>
                    </div>
                    <PageDescription>Visão geral e performance de campanhas</PageDescription>
                </div>
                <PageActions>
                    <Button asChild className="bg-blue-900 text-white hover:bg-blue-800">
                        <Link href={`/projects/${projectId}/details/campaigns`}>
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Ver Campanhas
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </PageActions>
            </PageHeader>
            <PageContent>
                {/* Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MousePointerClick className="w-4 h-4" />
                                <span>Total de Cliques</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                {isLoading ? "..." : formatNumber(totalClicks)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <TrendingUp className="w-4 h-4" />
                                <span>Total Conversões</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                {isLoading ? "..." : formatNumber(totalConversions)}
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
                                {isLoading ? "..." : formatNumber(totalQualified)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <DollarSign className="w-4 h-4" />
                                <span>Total Vendas</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                {isLoading ? "..." : formatNumber(totalSales)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Investment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="text-sm text-slate-500">Investimento Google Ads</div>
                            <p className="text-xl font-bold text-slate-900 mt-1">
                                {isLoading ? "..." : formatCurrency(totalInvestmentGoogleAds)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="text-sm text-slate-500">Investimento Total</div>
                            <p className="text-xl font-bold text-slate-900 mt-1">
                                {isLoading ? "..." : formatCurrency(totalInvestmentTotal)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="text-sm text-slate-500">Taxa de Aprovação Média</div>
                            <p className="text-xl font-bold text-slate-900 mt-1">
                                {isLoading ? "..." : formatPercent(avgApprovalsRate)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                {campaigns.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">Conversões por Período</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CampaignChart
                                    kind="line"
                                    title=""
                                    labels={chartLabels}
                                    datasets={[
                                        {
                                            label: "Conversões",
                                            data: conversionsData,
                                            borderColor: "#2563eb",
                                            backgroundColor: "rgba(37,99,235,0.2)",
                                        },
                                    ]}
                                />
                            </CardContent>
                        </Card>
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">Cliques por Período</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CampaignChart
                                    kind="bar"
                                    title=""
                                    labels={chartLabels}
                                    datasets={[
                                        {
                                            label: "Cliques",
                                            data: clicksData,
                                            backgroundColor: "rgba(99,102,241,0.4)",
                                            borderColor: "#6366f1",
                                        },
                                    ]}
                                />
                            </CardContent>
                        </Card>
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">Leads Qualificados por Período</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CampaignChart
                                    kind="line"
                                    title=""
                                    labels={chartLabels}
                                    datasets={[
                                        {
                                            label: "Qualificados",
                                            data: qualifiedData,
                                            borderColor: "#10b981",
                                            backgroundColor: "rgba(16,185,129,0.2)",
                                        },
                                    ]}
                                />
                            </CardContent>
                        </Card>
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">Investimento Google Ads por Período</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CampaignChart
                                    kind="bar"
                                    title=""
                                    labels={chartLabels}
                                    datasets={[
                                        {
                                            label: "Investimento (R$)",
                                            data: investmentData,
                                            backgroundColor: "rgba(245,158,11,0.4)",
                                            borderColor: "#f59e0b",
                                        },
                                    ]}
                                />
                            </CardContent>
                        </Card>
                    </div>
                )}

                {!isLoading && campaigns.length === 0 && (
                    <Card className="shadow-md">
                        <CardContent className="py-12 text-center">
                            <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 mb-4">Nenhuma campanha cadastrada ainda</p>
                            <Button asChild className="bg-blue-900 text-white hover:bg-blue-800">
                                <Link href={`/projects/${projectId}/details/campaigns`}>
                                    Cadastrar Primeira Campanha
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </PageContent>
        </PageContainer>
    );
}
