"use client";

import { useParams } from "next/navigation";
import { ProjectDetailView } from "@/features/projects/components/ProjectDetailView";

export default function ProjectDetailsPage() {
    const params = useParams();
    const projectId = params.id as string;

    return <ProjectDetailView projectId={projectId} />;
}
      

