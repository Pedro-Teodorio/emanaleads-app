'use client'
import { PageActions, PageContainer, PageContent } from "@/components/common/Page";
import { PageHeader } from "@/components/common/Page";
import { PageTitle } from "@/components/common/Page";
import { PageDescription } from "@/components/common/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProjectDeleteDialog from "@/features/projects/components/ProjectDeleteDialog";
import ProjectFormDialog from "@/features/projects/components/ProjectFormDialog";
import ProjectGrid from "@/features/projects/components/ProjectGrid";
import { statusConfig } from "@/features/projects/constants/project";
import { ProjectFormSchema } from "@/features/projects/schemas/projects";
import { useCreateProjectMutation, useDeleteProjectMutation, useUpdateProjectMutation } from "@/features/projects/services/mutation";
import { projectsQueries } from "@/features/projects/services/queries";
import { Project } from "@/features/projects/types/projects";
import { usersQueries } from "@/features/users/services/queries";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/common/AppPagination";

export default function ProjectsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Parâmetros de paginação, busca e filtro da URL
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    const [dialogOpen, setDialogOpen] = useState(false);
    const [projectDeleteDialogOpen, setProjectDeleteDialogOpen] = useState(false);
    const [projectDeleteId, setProjectDeleteId] = useState("");
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [currentSearchTerm, setCurrentSearchTerm] = useState(search);
    const [currentStatus, setCurrentStatus] = useState(status);

    const { data: projectsData, isLoading: projectsLoading } = useQuery(
        projectsQueries.list({ page, limit, search, status })
    );

    // Busca de usuários para o formulário
    const { data: usersData, isLoading: usersLoading } = useQuery(usersQueries.list({ page: 1, limit: 100 })); // Busca uma grande quantidade para preencher o select

    const { mutate: createProject, isPending: createLoading } = useCreateProjectMutation({ setDialogOpen, setEditingProject });
    const { mutate: updateProject, isPending: updateLoading } = useUpdateProjectMutation({ setDialogOpen, setEditingProject });
    const { mutate: deleteProject, isPending: deleteLoading } = useDeleteProjectMutation({ setProjectDeleteDialogOpen });

    const onSubmit = (data: ProjectFormSchema) => {
        if (editingProject) {
            updateProject({ id: editingProject.id, project: data });
        } else {
            createProject(data);
        }
    }

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setDialogOpen(true);
    }

    const handleDeleteProject = (projectId: string) => {
        setProjectDeleteDialogOpen(true);
        setProjectDeleteId(projectId);
    }

    const handleApplyFilters = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (currentSearchTerm) {
            newSearchParams.set('search', currentSearchTerm);
        } else {
            newSearchParams.delete('search');
        }
        if (currentStatus) {
            newSearchParams.set('status', currentStatus);
        } else {
            newSearchParams.delete('status');
        }
        newSearchParams.set('page', '1'); // Resetar para a primeira página ao aplicar filtros
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    const handleClearFilters = () => {
        setCurrentSearchTerm("");
        setCurrentStatus("");
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete('search');
        newSearchParams.delete('status');
        newSearchParams.set('page', '1');
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('page', newPage.toString());
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    return (
        <>
            <PageContainer>
                <PageHeader>
                    <div className="flex flex-col gap-2">
                        <PageTitle>Projetos</PageTitle>
                        <PageDescription>
                            Gerencie seus projetos aqui.
                        </PageDescription>
                    </div>
                    <PageActions>
                        <Button className="w-full bg-blue-900 text-white hover:bg-blue-800"
                            onClick={() => {
                                setDialogOpen(true);
                                setEditingProject(null);
                            }}
                        >
                            <PlusCircle className="inline-block size-4" />
                            Novo Projeto
                        </Button>
                    </PageActions>
                </PageHeader>
                <PageContent container>
                    <div key={`${search}-${status}`} className="flex flex-col md:flex-row gap-2 mb-2">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Buscar por nome"
                                value={currentSearchTerm}
                                onChange={(e) => setCurrentSearchTerm(e.target.value)}
                                className="pl-10 w-full sm:w-[250px]"
                            />
                        </div>
                        <Select value={currentStatus} onValueChange={setCurrentStatus}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filtrar por status" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(statusConfig).map(([key, { label }]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button className="bg-blue-900 text-white hover:bg-blue-800" onClick={handleApplyFilters}>
                            Aplicar Filtros
                        </Button>
                        {(currentSearchTerm || currentStatus) && (
                            <Button variant="outline" onClick={handleClearFilters}>
                                Limpar Filtros
                            </Button>
                        )}
                    </div>
                    <ProjectGrid
                        projects={projectsData?.data || []}
                        users={usersData?.data || []}
                        loading={projectsLoading || usersLoading}
                        onEdit={handleEditProject}
                        onDelete={handleDeleteProject}
                    />
                    {projectsData?.meta && (
                        <div className="mt-8">
                            <Pagination
                                pagination={{
                                    total: projectsData.meta.total,
                                    page: projectsData.meta.page,
                                    perPage: projectsData.meta.limit,
                                }}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </PageContent>
            </PageContainer >
            <ProjectFormDialog
                open={dialogOpen}
                loading={createLoading || updateLoading}
                onOpenChange={setDialogOpen}
                onSubmit={onSubmit}
                users={usersData?.data?.filter(u => u.role === 'ADMIN') || []}
                project={editingProject || undefined}
            />
            <ProjectDeleteDialog
                open={projectDeleteDialogOpen}
                onOpenChange={setProjectDeleteDialogOpen}
                onSubmit={deleteProject}
                loading={deleteLoading}
                projectId={projectDeleteId}
            />
        </>
    );
}
