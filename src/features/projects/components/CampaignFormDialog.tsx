import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Campaign } from "../types/campaigns";
import { useForm } from "react-hook-form";
import { campaignFormSchema, CampaignFormSchema } from "../schemas/campaigns";
import { zodResolver } from "@hookform/resolvers/zod";
import { monthsConfig } from "../constants/campaigns";

interface CampaignFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    campaign?: Campaign;
    onSubmit: (data: CampaignFormSchema) => void;
    loading: boolean;
}

export default function CampaignFormDialog({
    open,
    onOpenChange,
    onSubmit,
    loading,
    campaign,
}: CampaignFormDialogProps) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

    const form = useForm<CampaignFormSchema>({
        values: campaign
            ? {
                name: campaign.name,
                monthPayment: campaign.monthPayment,
                yearPayment: campaign.yearPayment,
                monthCampaign: campaign.monthCampaign,
                yearCampaign: campaign.yearCampaign,
                clicks: campaign.clicks,
                conversions: campaign.conversions,
                qualified: campaign.qualified,
                sales: campaign.sales,
                investmentGoogleAds: campaign.investmentGoogleAds,
                investmentTotal: campaign.investmentTotal,
                approvalsRate: campaign.approvalsRate ?? undefined,
                goalQualifiedConv: campaign.goalQualifiedConv ?? undefined,
            }
            : {
                name: "",
                monthPayment: new Date().getMonth() + 1,
                yearPayment: currentYear,
                monthCampaign: new Date().getMonth() + 1,
                yearCampaign: currentYear,
                clicks: 0,
                conversions: 0,
                qualified: 0,
                sales: 0,
                investmentGoogleAds: 0,
                investmentTotal: 0,
                approvalsRate: undefined,
                goalQualifiedConv: undefined,
            },
        mode: "onChange",
        resolver: zodResolver(campaignFormSchema),
    });

    const handleSubmit = (data: CampaignFormSchema) => {
        onSubmit(data);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{campaign ? "Editar Campanha" : "Nova Campanha"}</DialogTitle>
                    <DialogDescription>
                        {campaign ? "Edite as informações da campanha abaixo." : "Preencha os campos abaixo para criar uma nova campanha."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome da campanha" className='h-11' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Período da Campanha */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FormField
                                control={form.control}
                                name="monthCampaign"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mês Campanha *</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            value={String(field.value)}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Mês" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.entries(monthsConfig).map(([key, label]) => (
                                                    <SelectItem key={key} value={key}>
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="yearCampaign"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ano Campanha *</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            value={String(field.value)}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Ano" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {years.map((year) => (
                                                    <SelectItem key={year} value={String(year)}>
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="monthPayment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mês Pagamento *</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            value={String(field.value)}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Mês" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.entries(monthsConfig).map(([key, label]) => (
                                                    <SelectItem key={key} value={key}>
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="yearPayment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ano Pagamento *</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            value={String(field.value)}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Ano" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {years.map((year) => (
                                                    <SelectItem key={year} value={String(year)}>
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Métricas */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FormField
                                control={form.control}
                                name="clicks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cliques *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                className='h-11'
                                                value={field.value}
                                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
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
                                        <FormLabel>Conversões *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                className='h-11'
                                                value={field.value}
                                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
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
                                        <FormLabel>Qualificados *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                className='h-11'
                                                value={field.value}
                                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
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
                                        <FormLabel>Vendas *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                className='h-11'
                                                value={field.value}
                                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Investimentos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="investmentGoogleAds"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Investimento Google Ads (R$) *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                step={0.01}
                                                className='h-11'
                                                value={field.value}
                                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
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
                                        <FormLabel>Investimento Total (R$) *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                step={0.01}
                                                className='h-11'
                                                value={field.value}
                                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Opcionais */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="approvalsRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Taxa de Aprovação (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                max={100}
                                                step={0.1}
                                                className='h-11'
                                                placeholder="Opcional"
                                                value={field.value ?? ''}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
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
                                        <FormLabel>Meta Conv. Qualificadas</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                className='h-11'
                                                placeholder="Opcional"
                                                value={field.value ?? ''}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    onOpenChange(false);
                                    form.reset();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-900 text-white hover:bg-blue-800"
                            >
                                {loading ? "Salvando..." : campaign ? "Atualizar" : "Criar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
