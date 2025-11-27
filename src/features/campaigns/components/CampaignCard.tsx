import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, TrendingUp, Target, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { Campaign } from "../types/campaign";

interface CampaignCardProps {
    campaign: Campaign;
    index: number;
    onEdit: (campaign: Campaign) => void;
    onDelete: (campaignId: string) => void;
}

export function CampaignCard({ campaign, index, onEdit, onDelete }: CampaignCardProps) {
    const conversionRate = campaign.clicks > 0
        ? ((campaign.conversions / campaign.clicks) * 100).toFixed(1)
        : '0';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="min-w-0"
        >
            <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start gap-3 min-w-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center shadow-md shrink-0">
                                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-900 text-base sm:text-lg leading-tight">
                                    {campaign.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <Badge variant="outline" className="text-xs">
                                        Campanha: {String(campaign.monthCampaign).padStart(2, '0')}/{campaign.yearCampaign}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        Pgto: {String(campaign.monthPayment).padStart(2, '0')}/{campaign.yearPayment}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Métricas */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <Target className="w-3 h-3" />
                                    <span>Cliques</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-900">
                                    {campaign.clicks.toLocaleString('pt-BR')}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Conversões</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-900">
                                    {campaign.conversions.toLocaleString('pt-BR')}
                                    <span className="text-xs text-slate-500 ml-1">({conversionRate}%)</span>
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="text-xs text-slate-500">Qualificados</div>
                                <p className="text-sm font-semibold text-slate-900">
                                    {campaign.qualified.toLocaleString('pt-BR')}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="text-xs text-slate-500">Vendas</div>
                                <p className="text-sm font-semibold text-green-600">
                                    {campaign.sales.toLocaleString('pt-BR')}
                                </p>
                            </div>
                        </div>

                        {/* Investimento */}
                        <div className="pt-3 border-t border-slate-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <DollarSign className="w-3 h-3" />
                                    <span>Investimento Total</span>
                                </div>
                                <p className="text-sm font-bold text-slate-900">
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                        minimumFractionDigits: 2,
                                    }).format(Number(campaign.investmentTotal))}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(campaign)}
                                className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                            >
                                <Pencil className="w-4 h-4 mr-2" />
                                Editar
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDelete(campaign.id)}
                                className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
