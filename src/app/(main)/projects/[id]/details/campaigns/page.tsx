"use client";

import { PageActions, PageContainer, PageContent, PageHeader, PageDescription, PageTitle } from "@/components/common/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CampaignGrid from "@/features/projects/components/CampaignGrid";
import CampaignFormDialog from "@/features/projects/components/CampaignFormDialog";
import CampaignDeleteDialog from "@/features/projects/components/CampaignDeleteDialog";
import { campaignsQueries } from "@/features/projects/services/campaignQueries";
import {
    useCreateCampaignMutation,
    useDeleteCampaignMutation,
    useUpdateCampaignMutation,
} from "@/features/projects/services/campaignMutations";
import { Campaign } from "@/features/projects/types/campaigns";
import { CampaignFormSchema } from "@/features/projects/schemas/campaigns";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Search, ArrowLeft } from "lucide-react";
import { useState, use } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/common/AppPagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { monthsConfig } from "@/features/projects/constants/campaigns";
import Link from "next/link";

interface CampaignsPageProps {
    params: Promise<{ id: string }>;
}

export default function CampaignsPage({ params }: CampaignsPageProps) {
    const { id: projectId } = use(params);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Parâmetros de paginação e busca da URL
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "6");
    const search = searchParams.get("search") || "";
    const year = searchParams.get("year") ? Number.parseInt(searchParams.get("year")!) : undefined;
    const month = searchParams.get("month") ? Number.parseInt(searchParams.get("month")!) : undefined;

    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
    const [currentSearchTerm, setCurrentSearchTerm] = useState(search);
    const [currentYear, setCurrentYear] = useState(year?.toString() || "");
    const [currentMonth, setCurrentMonth] = useState(month?.toString() || "");

    // Fetch campaigns
    const { data: campaignsData, isLoading } = useQuery(
        campaignsQueries.list({
            projectId,
            page,
            limit,
            search,
            year,
            month,
        })
    );

    // Mutations
    const { mutate: createCampaign, isPending: createLoading } = useCreateCampaignMutation({
        projectId,
        setDialogOpen,
        setEditingCampaign,
    });
    const { mutate: updateCampaign, isPending: updateLoading } = useUpdateCampaignMutation({
        projectId,
        setDialogOpen,
        setEditingCampaign,
    });
    const { mutate: deleteCampaign, isPending: deleteLoading } = useDeleteCampaignMutation({
        projectId,
        setDeleteDialogOpen,
    });

    const handleSubmit = (data: CampaignFormSchema) => {
        if (editingCampaign) {
            updateCampaign({ campaignId: editingCampaign.id, data });
        } else {
            createCampaign(data);
        }
    };

    const handleEdit = (campaign: Campaign) => {
        setEditingCampaign(campaign);
        setDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setDeleteDialogOpen(true);
        setDeleteId(id);
    };

    const handleSearch = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (currentSearchTerm) {
            newSearchParams.set("search", currentSearchTerm);
        } else {
            newSearchParams.delete("search");
        }
        if (currentYear) {
            newSearchParams.set("year", currentYear);
        } else {
            newSearchParams.delete("year");
        }
        if (currentMonth) {
            newSearchParams.set("month", currentMonth);
        } else {
            newSearchParams.delete("month");
        }
        newSearchParams.set("page", "1");
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    const handleClearSearch = () => {
        setCurrentSearchTerm("");
        setCurrentYear("");
        setCurrentMonth("");
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete("search");
        newSearchParams.delete("year");
        newSearchParams.delete("month");
        newSearchParams.set("page", "1");
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("page", newPage.toString());
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    const currentYearValue = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYearValue - 5 + i);

    return (
        <>
            <PageContainer>
                <PageHeader>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href={`/projects/${projectId}/details`}>
                                    <ArrowLeft className="w-4 h-4" />
                                </Link>
                            </Button>
                            <PageTitle>Campanhas</PageTitle>
                        </div>
                        <PageDescription>Gerencie as campanhas deste projeto</PageDescription>
                    </div>
                    <PageActions>
                        <Button
                            className="w-full bg-blue-900 text-white hover:bg-blue-800"
                            onClick={() => {
                                setDialogOpen(true);
                                setEditingCampaign(null);
                            }}
                        >
                            <PlusCircle className="inline-block size-4" />
                            Nova Campanha
                        </Button>
                    </PageActions>
                </PageHeader>
                <PageContent container>
                    <div
                        key={`${search}-${year}-${month}`}
                        className="flex flex-col md:flex-row gap-2 mb-4"
                    >
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Buscar por nome"
                                value={currentSearchTerm}
                                onChange={(e) => setCurrentSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={currentYear} onValueChange={setCurrentYear}>
                            <SelectTrigger className="w-full md:w-[150px]">
                                <SelectValue placeholder="Ano" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((y) => (
                                    <SelectItem key={y} value={String(y)}>
                                        {y}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={currentMonth} onValueChange={setCurrentMonth}>
                            <SelectTrigger className="w-full md:w-[150px]">
                                <SelectValue placeholder="Mês" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(monthsConfig).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button className="bg-blue-900 text-white hover:bg-blue-800" onClick={handleSearch}>
                            Buscar
                        </Button>
                        {(currentSearchTerm || currentYear || currentMonth) && (
                            <Button variant="outline" onClick={handleClearSearch}>
                                Limpar
                            </Button>
                        )}
                    </div>
                    <CampaignGrid
                        projectId={projectId}
                        campaigns={campaignsData?.data || []}
                        loading={isLoading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    {campaignsData && (
                        <div className="mt-8">
                            <Pagination
                                pagination={{
                                    total: campaignsData.meta.total,
                                    page: campaignsData.meta.page,
                                    perPage: campaignsData.meta.limit,
                                }}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </PageContent>
            </PageContainer>
            <CampaignFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                campaign={editingCampaign || undefined}
                onSubmit={handleSubmit}
                loading={createLoading || updateLoading}
            />
            <CampaignDeleteDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onSubmit={deleteCampaign}
                loading={deleteLoading}
                campaignId={deleteId}
            />
        </>
    );
}
