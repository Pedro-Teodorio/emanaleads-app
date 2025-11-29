"use client";

import { useProjectMetrics } from "../hooks/useProject";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Users, Target, DollarSign, BarChart3, Activity } from "lucide-react";

interface ProjectMetricsChartsProps {
    projectId: string;
}

export function ProjectMetricsCharts({ projectId }: ProjectMetricsChartsProps) {
    const { data: metrics, isLoading } = useProjectMetrics(projectId);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={`metric-skeleton-${i}`} className="h-32" />
                ))}
            </div>
        );
    }

    if (!metrics) {
        return null;
    }

    const stats = [
        {
            title: "Total de Membros",
            value: metrics.totalMembers,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Campanhas",
            value: metrics.totalCampaigns,
            icon: BarChart3,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Leads",
            value: metrics.totalLeads,
            icon: Target,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Investimento Total",
            value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                metrics.campaignsOverview?.totalInvestment || 0
            ),
            icon: DollarSign,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Activity className="w-6 h-6 text-slate-700" />
                <h2 className="text-2xl font-bold text-slate-900">Métricas do Projeto</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {metrics.campaignsOverview && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-slate-500">Total de Cliques</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900">
                                    {metrics.campaignsOverview.totalClicks.toLocaleString('pt-BR')}
                                </span>
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-slate-500">Conversões</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900">
                                    {metrics.campaignsOverview.totalConversions.toLocaleString('pt-BR')}
                                </span>
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-slate-500">Vendas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900">
                                    {metrics.campaignsOverview.totalSales.toLocaleString('pt-BR')}
                                </span>
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
