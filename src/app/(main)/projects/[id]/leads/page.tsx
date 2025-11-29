"use client";

import { PageActions, PageContainer, PageContent, PageHeader, PageDescription, PageTitle } from "@/components/common/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LeadGrid from "@/features/leads/components/LeadGrid";
import LeadFormDialog from "@/features/leads/components/LeadFormDialog";
import LeadDeleteDialog from "@/features/leads/components/LeadDeleteDialog";
import LeadStatusTransitionDialog from "@/features/leads/components/LeadStatusTransitionDialog";
import { leadsQueries } from "@/features/leads/services/queries";
import { useCreateLeadMutation, useDeleteLeadMutation, useUpdateLeadMutation, useUpdateLeadStatusMutation } from "@/features/leads/services/mutations";
import { Lead } from "@/features/leads/types/leads";
import { LeadFormSchema } from "@/features/leads/schemas/lead";
import { useQuery } from "@tanstack/react-query";
import { Download, PlusCircle, Search } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/common/AppPagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { leadStatusConfig } from "@/features/leads/constants/leads";
import { usePermissions } from "@/hooks/usePermissions";
import { type LeadStatus, getNextStatuses } from "@/lib/rbac";
import { useMyProjects } from "@/features/projects/hooks/useProjectMembers";
import { useExportLeads } from "@/features/leads/hooks/useExportLeads";

export default function ProjectLeadsPage() {
    const { id: projectId } = useParams<{ id: string }>();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const permissions = usePermissions();
    const { data: myProjectsData } = useMyProjects();

    // Força projectId nos parâmetros de busca
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "6");
    const search = searchParams.get("search") || "";
    const statuses = searchParams.get("statuses") || "";
    const unassigned = searchParams.get("unassigned") === "true";

    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [editingLead, setEditingLead] = useState<Lead | null>(null);
    const [statusLead, setStatusLead] = useState<Lead | null>(null);
    const [currentSearchTerm, setCurrentSearchTerm] = useState(search);
    const [currentStatuses, setCurrentStatuses] = useState(statuses);
    const [currentUnassigned, setCurrentUnassigned] = useState(unassigned);
   

    // Fetch leads com projectId fixo
    const { data: leadsData, isLoading } = useQuery(
        leadsQueries.list({
            page,
            limit,
            search,
            statuses,
            projectId, // Força o filtro pelo projeto atual
            unassigned: unassigned ? "true" : "false",
        })
    );

    // Mutations
    const { mutate: createLead, isPending: createLoading } = useCreateLeadMutation({ setDialogOpen, setEditingLead });
    const { mutate: updateLead, isPending: updateLoading } = useUpdateLeadMutation({ setDialogOpen, setEditingLead });
    const { mutate: deleteLead, isPending: deleteLoading } = useDeleteLeadMutation({ setDeleteDialogOpen });
    const { mutate: updateStatus, isPending: statusLoading } = useUpdateLeadStatusMutation({ setStatusDialogOpen });

    const handleSubmit = (data: LeadFormSchema) => {
        // Força projectId no lead
        const leadData = { ...data, projectId };
        if (editingLead) {
            updateLead({ id: editingLead.id, lead: leadData });
        } else {
            createLead(leadData);
        }
    };

    const handleEdit = (lead: Lead) => {
        setEditingLead(lead);
        setDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setDeleteDialogOpen(true);
        setDeleteId(id);
    };

    const handleUpdateStatus = (lead: Lead) => {
        setStatusLead(lead);
        setStatusDialogOpen(true);
    };

    const handleStatusSubmit = (toStatus: LeadStatus, reason?: string) => {
        if (statusLead) {
            updateStatus({ id: statusLead.id, toStatus, reason });
        }
    };

    const canUpdateLeadStatus = (lead: Lead): boolean => {
        const nextStatuses = getNextStatuses(lead.status);
        if (nextStatuses.length === 0) return false;

        if (!permissions.permissions?.canUpdateLeadStatus) return false;

        if (permissions.role === 'ROOT') return true;

        if (permissions.role === 'ADMIN') {
            return permissions.canEditLead({
                lead,
                userProjects: myProjectsData?.data
            });
        }

        if (permissions.role === 'PROJECT_USER') {
            return lead.assignedUserId === permissions.userId;
        }

        return false;
    };

    const handleSearch = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (currentSearchTerm) {
            newSearchParams.set("search", currentSearchTerm);
        } else {
            newSearchParams.delete("search");
        }
        if (currentStatuses) {
            newSearchParams.set("statuses", currentStatuses);
        } else {
            newSearchParams.delete("statuses");
        }
        if (currentUnassigned) {
            newSearchParams.set("unassigned", "true");
        } else {
            newSearchParams.delete("unassigned");
        }
        newSearchParams.set("page", "1");
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    const handleClearSearch = () => {
        setCurrentSearchTerm("");
        setCurrentStatuses("");
        setCurrentUnassigned(false);
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("page", "1");
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("page", newPage.toString());
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

      const { mutate: exportLeads, isPending: exportLoading } = useExportLeads();
    
        const handleExport = () => {
            exportLeads({
                search: currentSearchTerm || undefined,
                statuses: currentStatuses || undefined,
                projectId: projectId || undefined,
                unassigned: currentUnassigned ? 'true' : undefined,
            });
        };

    return (
        <>
            <PageContainer>
                <PageHeader>
                    <div className="flex flex-col gap-2">
                        <PageTitle>Leads do Projeto</PageTitle>
                        <PageDescription>Gerencie os leads deste projeto</PageDescription>
                    </div>
                    <PageActions>
                        {permissions.permissions?.canCreateLead && (
                            <Button
                                className="w-full bg-blue-900 text-white hover:bg-blue-800"
                                onClick={() => {
                                    setDialogOpen(true);
                                    setEditingLead(null);
                                }}
                            >
                                <PlusCircle className="inline-block size-4" />
                                Novo Lead
                            </Button>
                        )}
                      
                    </PageActions>
                </PageHeader>
                <PageContent container>
                    <div
                        key={`${search}-${statuses}-${unassigned}`}
                        className="flex flex-col md:flex-row gap-2 mb-2"
                    >
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Buscar por nome, email ou telefone"
                                value={currentSearchTerm}
                                onChange={(e) => setCurrentSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={currentStatuses} onValueChange={setCurrentStatuses}>
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="Filtrar por status" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(leadStatusConfig).map(([key, { label }]) => (
                                    <SelectItem key={key} value={key}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button className="bg-blue-900 text-white hover:bg-blue-800" onClick={handleSearch}>
                            Buscar
                        </Button>
                        {(currentSearchTerm || currentStatuses || currentUnassigned) && (
                            <Button variant="outline" onClick={handleClearSearch}>
                                Limpar
                            </Button>
                        )}
                             {permissions.role === 'ADMIN' && (
                            <Button
                                className=" bg-blue-700 text-white hover:bg-blue-600"
                                onClick={handleExport}
                                disabled={exportLoading}
                            >
                                <Download className="inline-block size-4" />
                                {exportLoading ? 'Exportando...' : 'Exportar CSV'}
                            </Button>
                        )}
                    </div>
                 
                    <LeadGrid
                        leads={leadsData?.data || []}
                        loading={isLoading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onUpdateStatus={handleUpdateStatus}
                        canEdit={(lead) => permissions.canEditLead({
                            lead,
                            userProjects: myProjectsData?.data
                        })}
                        canDelete={(lead) => permissions.canDeleteLead({
                            lead,
                            userProjects: myProjectsData?.data
                        })}
                        canUpdateStatus={canUpdateLeadStatus}
                    />
                    {leadsData && (
                        <div className="mt-8">
                            <Pagination
                                pagination={{
                                    total: leadsData.meta.total,
                                    page: leadsData.meta.page,
                                    perPage: leadsData.meta.limit,
                                }}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </PageContent>
            </PageContainer>
            <LeadFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                lead={editingLead || undefined}
                onSubmit={handleSubmit}
                loading={createLoading || updateLoading}
            />
            <LeadDeleteDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onSubmit={deleteLead}
                loading={deleteLoading}
                leadId={deleteId}
            />
            {statusLead && (
                <LeadStatusTransitionDialog
                    open={statusDialogOpen}
                    onOpenChange={setStatusDialogOpen}
                    currentStatus={statusLead.status}
                    onSubmit={handleStatusSubmit}
                    loading={statusLoading}
                />
            )}
        </>
    );
}
