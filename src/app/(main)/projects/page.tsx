'use client'
import { PageActions, PageContainer, PageContent } from "@/components/common/Page";

import { PageHeader } from "@/components/common/Page";

import { PageTitle } from "@/components/common/Page";

import { PageDescription } from "@/components/common/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectDeleteDialog from "@/features/projects/components/ProjectDeleteDialog";
import ProjectFormDialog from "@/features/projects/components/ProjectFormDialog";
import ProjectGrid from "@/features/projects/components/ProjectGrid";
import { ProjectFormSchema } from "@/features/projects/schemas/projects";
import { useCreateProjectMutation, useDeleteProjectMutation, useUpdateProjectMutation } from "@/features/projects/services/mutation";
import { projectsQueries } from "@/features/projects/services/queries";
import { Project } from "@/features/projects/types/projects";
import { usersQueries } from "@/features/users/services/queries";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";

import { useState } from "react";

export default function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [projectDeleteDialogOpen, setProjectDeleteDialogOpen] = useState(false);
    const [projectDeleteId, setProjectDeleteId] = useState("");

    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const { data, isLoading } = useQuery(projectsQueries.all())
    const { data: usersData, isLoading: usersLoading } = useQuery(usersQueries.list({ page: 1, limit: 6 }))
    const { mutate: createProject, isPending: createLoading } = useCreateProjectMutation({ setDialogOpen, setEditingProject })
    const { mutate: updateProject, isPending: updateLoading } = useUpdateProjectMutation({ setDialogOpen, setEditingProject })
    const { mutate: deleteProject, isPending: deleteLoading } = useDeleteProjectMutation({ setProjectDeleteDialogOpen })

    const onSubmit = (data: ProjectFormSchema) => {
        if (editingProject) {
            updateProject({ id: editingProject.id, project: data })
        } else {
            createProject(data)
        }
    }

    const handleEditProject = (project: Project) => {
        setEditingProject(project)
        setDialogOpen(true)
    }

    const handleDeleteProject = (projectId: string) => {
        setProjectDeleteDialogOpen(true)
        setProjectDeleteId(projectId)
    }

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
                                setEditingProject(null)
                                setDialogOpen(true)
                            }}
                        >
                            <PlusCircle className="inline-block size-4" />
                            Novo Projeto
                        </Button>
                    </PageActions>
                </PageHeader>
                <PageContent container>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Buscar por nome"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <ProjectGrid
                        projects={data || []}
                        users={usersData?.data || []}
                        loading={isLoading || usersLoading}
                        onEdit={handleEditProject}
                        onDelete={handleDeleteProject}
                    />
                </PageContent>
            </PageContainer>
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