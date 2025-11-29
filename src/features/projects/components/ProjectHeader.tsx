"use client";

import { Project } from "../types/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FolderKanban, Calendar, User as UserIcon, FileText } from "lucide-react";
import { format } from "date-fns";
import { statusConfig } from "../constants/project";

interface ProjectHeaderProps {
    project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
    return (
        <Card className="overflow-hidden py-0">
            <div className="bg-linear-to-r from-blue-500 to-blue-600 p-6 ">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
                            <FolderKanban className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
                            <Badge className={`${statusConfig[project.status]?.color} border-white/20`}>
                                {statusConfig[project.status]?.label}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.description && (
                        <div className="md:col-span-3 flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                            <FileText className="w-5 h-5 text-slate-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-slate-700 mb-1">Descrição</p>
                                <p className="text-slate-600">{project.description}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <UserIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Administrador</p>
                            <p className="font-medium text-slate-900">{project.admin?.name || "N/A"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Criado em</p>
                            <p className="font-medium text-slate-900">
                                {format(new Date(project.createdAt), "dd/MM/yyyy")}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Atualizado em</p>
                            <p className="font-medium text-slate-900">
                                {format(new Date(project.updatedAt), "dd/MM/yyyy")}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
