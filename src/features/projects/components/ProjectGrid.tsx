import { FolderKanban, Pencil, Trash2, Calendar, User as UserIcon, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "../types/projects";
import { User } from "@/features/users/types/user";
import { statusConfig } from "../constants/project";

interface ProjectGridProps {
    projects: Project[];
    users: User[];
    loading: boolean;
    onEdit: (project: Project) => void;
    onDelete: (projectId: string) => void;
}

export default function ProjectGrid({ projects, users, loading, onEdit, onDelete }: ProjectGridProps) {
    const router = useRouter();

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="border rounded-xl p-6 space-y-4">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-12">
                <FolderKanban className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Nenhum projeto encontrado</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
                const admin = users.find(u => u.id === project.adminId);

                return (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <Card className="hover:shadow-lg transition-all duration-300">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                                        <FolderKanban className="w-5 h-5 text-white" />
                                    </div>
                                    <Badge className={`${statusConfig[project.status]?.color} border`}>
                                        {statusConfig[project.status]?.label}
                                    </Badge>
                                </div>

                                <div className="flex gap-1 ">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(project)}
                                        className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDelete(project.id)}
                                        className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <CardTitle className="text-lg">{project.name}</CardTitle>

                                {project.description && (
                                    <p className="text-sm text-slate-600 line-clamp-1">
                                        {project.description}
                                    </p>
                                )}

                                <div className="space-y-2 text-sm">
                                    {admin && (
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <UserIcon className="w-4 h-4" />
                                            <span>{admin.name}</span>
                                        </div>
                                    )}
                                    {project.createdAt && (
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>{format(new Date(project.createdAt), "dd/MM/yyyy")}</span>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    variant="ghost"
                                    className=" gap-2 group/btn flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                                    onClick={() => router.push(`/projects/${project.id}/details`)}
                                >
                                    Ver Detalhes
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
}