import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderKanban, ArrowRight, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { Project } from "@/features/projects/types/projects";
import { statusConfig } from "@/features/projects/constants/project";


export interface RecentProjectsProps {
  projects: Project[];
  loading: boolean;
}

export default function RecentProjects({ projects, loading }: RecentProjectsProps) {
  const recentProjects = projects.slice(0, 5);

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="border-b border-slate-200 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-slate-600" />
            Projetos Recentes
          </CardTitle>
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        ) : recentProjects.length === 0 ? (
          <div className="text-center py-12">
            <FolderKanban className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Nenhum projeto encontrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`#`}
                className="block"
              >
                <div className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {project.name}
                      </h3>
                      {project.description && (
                        <p className="text-sm text-slate-600 mt-1 line-clamp-1">
                          {project.description}
                        </p>
                      )}
                      {project.createdAt && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(project.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      )}
                    </div>
                    <Badge className={`${statusConfig[project.status]?.color} border shrink-0`}>
                      {statusConfig[project.status]?.label}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}