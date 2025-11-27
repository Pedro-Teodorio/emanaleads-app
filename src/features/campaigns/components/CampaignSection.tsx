"use client";

import { useState } from "react";
import { useCampaigns, useDeleteCampaign } from "../hooks/useCampaigns";
import { CampaignGrid } from "./CampaignGrid";
import { CampaignFormModal } from "./CampaignFormModal";
import { DeleteCampaignDialog } from "./DeleteCampaignDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, BarChart3 } from "lucide-react";
import { Campaign } from "../types/campaign";
import { set } from "zod";

interface CampaignSectionProps {
    projectId: string;
}

export function CampaignSection({ projectId }: CampaignSectionProps) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
    const [deletingCampaignId, setDeletingCampaignId] = useState<string | null>(null);

    const { data, isLoading } = useCampaigns({ projectId, page, limit: 10, search });
    const deleteMutation = useDeleteCampaign(projectId);

    const handleEdit = (campaign: Campaign) => {
        setEditingCampaign(campaign);
    };

    const handleDelete = (campaignId: string) => {
        setDeletingCampaignId(campaignId);
    };

    const confirmDelete = () => {
        if (deletingCampaignId) {
            deleteMutation.mutate(deletingCampaignId, {
                onSuccess: () => setDeletingCampaignId(null),
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-slate-700" />
                    <h2 className="text-2xl font-bold text-slate-900">Campanhas</h2>
                </div>
                <Button onClick={() => {
                    setIsCreateModalOpen(true)
                    setEditingCampaign(null);
                }} className="gap-2 bg-blue-900 text-white hover:bg-blue-800">
                    <Plus className="w-4 h-4" />
                    Nova Campanha
                </Button>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Buscar campanhas..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <CampaignGrid
                campaigns={data?.data || []}
                loading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                page={page}
                totalPages={data?.meta.totalPages || 1}
                onPageChange={setPage}
            />

            <CampaignFormModal
                projectId={projectId}
                open={isCreateModalOpen || !!editingCampaign}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setEditingCampaign(null);
                }}
                campaign={editingCampaign}
            />

            <DeleteCampaignDialog
                open={!!deletingCampaignId}
                onClose={() => setDeletingCampaignId(null)}
                onConfirm={confirmDelete}
                isDeleting={deleteMutation.isPending}
            />
        </div>
    );
}
