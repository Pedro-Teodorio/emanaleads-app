import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Calendar, TrendingUp, DollarSign, MousePointerClick, Target, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { Campaign } from "../types/campaigns";
import { formatMonth, formatCurrency, formatNumber, formatPercent } from "../constants/campaigns";
import Link from "next/link";

interface CampaignGridProps {
    projectId: string;
    campaigns?: Campaign[];
    loading: boolean;
    onEdit: (campaign: Campaign) => void;
    onDelete: (id: string) => void;
    canEdit?: boolean;
    canDelete?: boolean;
}

export default function CampaignGrid({
    projectId,
    campaigns,
    loading,
    onEdit,
    onDelete,
    canEdit = true,
    canDelete = true,
}: Readonly<CampaignGridProps>) {
    if (loading) {
        const skeletonKeys = Array.from({ length: 6 }, (_, i) => `campaign-skeleton-${i}`);
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skeletonKeys.map((key) => (
                    <Card key={key} className="border-0 shadow-md">
                        <CardContent className="p-6">
                            <div className="space-y-3">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <div className="grid grid-cols-2 gap-2">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (!campaigns || campaigns.length === 0) {
        return (
            <div className="text-center py-12">
                <Target className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">Nenhuma campanha encontrada</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((campaign, index) => (
                <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="min-w-0"
                >
                    <Card className="shadow-md hover:shadow-lg transition-all duration-300 h-full">
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-lg line-clamp-1">{campaign.name}</CardTitle>
                                <Badge className="bg-blue-100 text-blue-800 border-blue-200 shrink-0">
                                    {formatMonth(campaign.monthCampaign)}/{campaign.yearCampaign}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Período de pagamento */}
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                <span>Pagamento: {formatMonth(campaign.monthPayment)}/{campaign.yearPayment}</span>
                            </div>

                            {/* Métricas principais */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-slate-50 rounded-lg p-2">
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <MousePointerClick className="w-3 h-3" />
                                        <span>Cliques</span>
                                    </div>
                                    <p className="font-semibold text-slate-900">{formatNumber(campaign.clicks)}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-2">
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>Conversões</span>
                                    </div>
                                    <p className="font-semibold text-slate-900">{formatNumber(campaign.conversions)}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-2">
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <Target className="w-3 h-3" />
                                        <span>Qualificados</span>
                                    </div>
                                    <p className="font-semibold text-slate-900">{formatNumber(campaign.qualified)}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-2">
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <DollarSign className="w-3 h-3" />
                                        <span>Vendas</span>
                                    </div>
                                    <p className="font-semibold text-slate-900">{formatNumber(campaign.sales)}</p>
                                </div>
                            </div>

                            {/* Investimentos */}
                            <div className="border-t border-slate-100 pt-3 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Inv. Google Ads:</span>
                                    <span className="font-medium">{formatCurrency(campaign.investmentGoogleAds)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Inv. Total:</span>
                                    <span className="font-medium">{formatCurrency(campaign.investmentTotal)}</span>
                                </div>
                                {campaign.approvalsRate !== null && campaign.approvalsRate !== undefined && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Taxa de Aprovação:</span>
                                        <span className="font-medium">{formatPercent(campaign.approvalsRate)}</span>
                                    </div>
                                )}
                            </div>

                            {/* Ações */}
                            <div className="flex gap-2 pt-2 border-t border-slate-100">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                                >
                                    <Link href={`/projects/${projectId}/details/campaigns/${campaign.id}`}>
                                        <Eye className="w-4 h-4 mr-2" />
                                        Ver Detalhes
                                    </Link>
                                </Button>
                                {canEdit && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit(campaign)}
                                        className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                )}
                                {canDelete && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onDelete(campaign.id)}
                                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
