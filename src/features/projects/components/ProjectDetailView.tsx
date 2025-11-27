"use client";

import { useProject } from "../hooks/useProject";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectMetricsCharts } from "./ProjectMetricsCharts";
import { CampaignSection } from "@/features/campaigns/components/CampaignSection";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

interface ProjectDetailViewProps {
    projectId: string;
}

export function ProjectDetailView({ projectId }: ProjectDetailViewProps) {
    const { data: project, isLoading, error } = useProject(projectId);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
                <Skeleton className="h-32 w-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }, (_, i) => `skeleton-${i}`).map((key) => (
                        <Skeleton key={key} className="h-24" />
                    ))}
                </div>
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="max-w-7xl mx-auto py-16 px-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-red-900 mb-2">Projeto não encontrado</h2>
                    <p className="text-red-700">O projeto que você está procurando não existe ou foi removido.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
            <ProjectHeader project={project} />
            <ProjectMetricsCharts projectId={projectId} />
            <CampaignSection projectId={projectId} />
        </div>
    );
}
