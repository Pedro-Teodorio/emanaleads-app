'use client'
import { PageActions, PageContainer, PageContent } from "@/components/common/Page";

import { PageHeader } from "@/components/common/Page";

import { PageTitle } from "@/components/common/Page";

import { PageDescription } from "@/components/common/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectGrid from "@/features/projects/components/ProjectGrid";
import { projects } from "@/mocks/projects";
import { users } from "@/mocks/users";
import { PlusCircle, Search } from "lucide-react";

import { useState } from "react";

export default function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <PageContainer>
            <PageHeader>
                <div className="flex flex-col gap-2">
                    <PageTitle>Projetos</PageTitle>
                    <PageDescription>
                        Gerencie seus projetos aqui.
                    </PageDescription>
                </div>
                <PageActions>
                    <Button className="w-full bg-blue-900 text-white hover:bg-blue-800">
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
                    projects={projects}
                    users={users}
                    loading={false}
                />
            </PageContent>
        </PageContainer>
    );
}