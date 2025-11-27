"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useCreateCampaign, useUpdateCampaign } from "../hooks/useCampaigns";
import { campaignFormSchema, CampaignFormSchema } from "../schemas/campaign";
import { Campaign } from "../types/campaign";
import { Loader2 } from "lucide-react";

// Valores de data atuais calculados uma única vez para evitar chamadas repetidas a new Date()
const CURRENT_MONTH = new Date().getMonth() + 1;
const CURRENT_YEAR = new Date().getFullYear();

// Valores padrão centralizados, incluindo campos opcionais de metas para garantir reset consistente
const DEFAULT_CAMPAIGN_VALUES: CampaignFormSchema = {
    name: "",
    monthPayment: CURRENT_MONTH,
    yearPayment: CURRENT_YEAR,
    monthCampaign: CURRENT_MONTH,
    yearCampaign: CURRENT_YEAR,
    clicks: 0,
    conversions: 0,
    qualified: 0,
    sales: 0,
    investmentGoogleAds: 0,
    investmentTotal: 0,
    approvalsRate: undefined,
    goalQualifiedConv: undefined,
};

interface CampaignFormModalProps {
    projectId: string;
    open: boolean;
    onClose: () => void;
    campaign?: Campaign | null;
}

export function CampaignFormModal({ projectId, open, onClose, campaign }: CampaignFormModalProps) {
    const isEditing = !!campaign;
    const createMutation = useCreateCampaign(projectId);
    const updateMutation = useUpdateCampaign(projectId, campaign?.id || "");

    const form = useForm<CampaignFormSchema>({
        resolver: zodResolver(campaignFormSchema),
        values: campaign || DEFAULT_CAMPAIGN_VALUES,
    });

    useEffect(() => {
        if (campaign) {
            // Merge garantindo inclusão de campos opcionais e evitando lixo residual
            form.reset({
                ...DEFAULT_CAMPAIGN_VALUES,
                name: campaign.name,
                monthPayment: campaign.monthPayment,
                yearPayment: campaign.yearPayment,
                monthCampaign: campaign.monthCampaign,
                yearCampaign: campaign.yearCampaign,
                clicks: campaign.clicks,
                conversions: campaign.conversions,
                qualified: campaign.qualified,
                sales: campaign.sales,
                investmentGoogleAds: Number(campaign.investmentGoogleAds),
                investmentTotal: Number(campaign.investmentTotal),
                approvalsRate: campaign.approvalsRate,
                goalQualifiedConv: campaign.goalQualifiedConv,
            });
        } else {
            form.reset(DEFAULT_CAMPAIGN_VALUES);
        }
    }, [campaign, form]);

    const onSubmit = (data: CampaignFormSchema) => {
        if (isEditing) {
            updateMutation.mutate(data, {
                onSuccess: () => {
                    onClose();
                    form.reset(DEFAULT_CAMPAIGN_VALUES);
                },
            });
        } else {
            createMutation.mutate(data, {
                onSuccess: () => {
                    onClose();
                    form.reset(DEFAULT_CAMPAIGN_VALUES);
                },
            });
        }
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Editar Campanha" : "Nova Campanha"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Atualize os dados da campanha" : "Preencha os dados da nova campanha"}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome da Campanha *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Campanha Q1 2024" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="monthCampaign"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mês da Campanha *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    max="12"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="yearCampaign"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ano da Campanha *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="2000"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="monthPayment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mês de Pagamento *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    max="12"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="yearPayment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ano de Pagamento *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="2000"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="font-medium mb-3">Métricas</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="clicks"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cliques</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="conversions"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Conversões</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="qualified"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Qualificados</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="sales"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vendas</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="font-medium mb-3">Investimento</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="investmentGoogleAds"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Google Ads (R$)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="investmentTotal"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total (R$)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="font-medium mb-3">Metas (Opcional)</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="approvalsRate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Taxa de Aprovação (%)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.1"
                                                        min="0"
                                                        max="100"
                                                        {...field}
                                                        value={field.value ?? ""}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            field.onChange(val === "" ? undefined : parseFloat(val));
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="goalQualifiedConv"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meta Qualif./Conv. (%)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.1"
                                                        min="0"
                                                        max="100"
                                                        {...field}
                                                        value={field.value ?? ""}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            field.onChange(val === "" ? undefined : parseFloat(val));
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-4 border-t">
                            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                                Cancelar
                            </Button>
                            <Button type="submit" className="bg-blue-900 text-white hover:bg-blue-800" disabled={isPending}>
                                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {isEditing ? "Salvar" : "Criar"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
