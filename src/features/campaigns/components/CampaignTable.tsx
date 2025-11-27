"use client";

import { Campaign } from "../types/campaign";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2, TrendingUp, Target, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CampaignTableProps {
    campaigns: Campaign[];
    loading: boolean;
    onEdit: (campaign: Campaign) => void;
    onDelete: (campaignId: string) => void;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function CampaignTable({
    campaigns,
    loading,
    onEdit,
    onDelete,
    page,
    totalPages,
    onPageChange,
}: CampaignTableProps) {
    if (loading) {
        return (
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Período</TableHead>
                            <TableHead>Cliques</TableHead>
                            <TableHead>Conversões</TableHead>
                            <TableHead>Vendas</TableHead>
                            <TableHead>Investimento</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...new Array(5)].map((_, i) => (
                            <TableRow key={`skeleton-${i}`}>
                                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (campaigns.length === 0) {
        return (
            <div className="border rounded-lg p-12 text-center">
                <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Nenhuma campanha encontrada</h3>
                <p className="text-slate-500">Crie sua primeira campanha para começar a rastrear métricas.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="font-semibold">Nome da Campanha</TableHead>
                            <TableHead className="font-semibold">Período Campanha</TableHead>
                            <TableHead className="font-semibold">Período Pgto</TableHead>
                            <TableHead className="font-semibold">
                                <div className="flex items-center gap-1">
                                    <Target className="w-4 h-4" />
                                    Cliques
                                </div>
                            </TableHead>
                            <TableHead className="font-semibold">Conversões</TableHead>
                            <TableHead className="font-semibold">Qualificados</TableHead>
                            <TableHead className="font-semibold">Vendas</TableHead>
                            <TableHead className="font-semibold">
                                <div className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    Investimento
                                </div>
                            </TableHead>
                            <TableHead className="text-right font-semibold">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaigns.map((campaign) => {
                            const conversionRate = campaign.clicks > 0
                                ? ((campaign.conversions / campaign.clicks) * 100).toFixed(1)
                                : '0';

                            return (
                                <TableRow key={campaign.id} className="hover:bg-slate-50/50">
                                    <TableCell className="font-medium">{campaign.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {String(campaign.monthCampaign).padStart(2, '0')}/{campaign.yearCampaign}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {String(campaign.monthPayment).padStart(2, '0')}/{campaign.yearPayment}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{campaign.clicks.toLocaleString('pt-BR')}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {campaign.conversions.toLocaleString('pt-BR')}
                                            <span className="text-xs text-slate-500">({conversionRate}%)</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{campaign.qualified.toLocaleString('pt-BR')}</TableCell>
                                    <TableCell className="font-medium text-green-600">{campaign.sales.toLocaleString('pt-BR')}</TableCell>
                                    <TableCell className="font-medium">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                            minimumFractionDigits: 2,
                                        }).format(Number(campaign.investmentTotal))}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onEdit(campaign)}
                                                className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onDelete(campaign.id)}
                                                className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        Página {page} de {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(page - 1)}
                            disabled={page === 1}
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(page + 1)}
                            disabled={page === totalPages}
                        >
                            Próxima
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
