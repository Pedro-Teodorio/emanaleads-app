import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { Campaign } from "../types/campaign";
import { CampaignCard } from "./CampaignCard";

interface CampaignGridProps {
    campaigns: Campaign[];
    loading: boolean;
    onEdit: (campaign: Campaign) => void;
    onDelete: (campaignId: string) => void;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function CampaignGrid({
    campaigns,
    loading,
    onEdit,
    onDelete,
    page,
    totalPages,
    onPageChange,
}: CampaignGridProps) {
    if (loading) {
        return (
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
                                    <div className="flex-1 space-y-3 min-w-0">
                                        <Skeleton className="h-5 w-32" />
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
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
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaigns.map((campaign, index) => (
                    <CampaignCard
                        key={campaign.id}
                        campaign={campaign}
                        index={index}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4">
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
