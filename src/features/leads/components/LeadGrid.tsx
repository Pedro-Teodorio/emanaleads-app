import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Phone, Mail, Calendar, UserX, User, GitBranchPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { format } from "date-fns";
import { Lead } from "../types/leads";
import { leadStatusConfig } from "../constants/leads";

interface LeadGridProps {
    leads?: Lead[];
    loading: boolean;
    onEdit: (lead: Lead) => void;
    onDelete: (id: string) => void;
    onUpdateStatus: (lead: Lead) => void;
    canEdit: (lead: Lead) => boolean;
    canDelete: (lead: Lead) => boolean;
    canUpdateStatus: (lead: Lead) => boolean;
}

export default function LeadGrid({ leads, loading, onEdit, onDelete, onUpdateStatus, canEdit, canDelete, canUpdateStatus }: Readonly<LeadGridProps>) {
    if (loading) {
        const skeletonKeys = Array.from({ length: 6 }, (_, i) => `lead-skeleton-${i}`);
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skeletonKeys.map((key) => (
                    <Card key={key} className="border-0 shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
                                <div className="flex-1 space-y-3 min-w-0">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (leads?.length === 0) {
        return (
            <div className="text-center py-12">
                <UserX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">Nenhum lead encontrado</p>
            </div>
        );
    }

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leads?.map((lead, index) => {
                const statusInfo = leadStatusConfig[lead.status];
                const canEditLead = canEdit(lead);
                const canDeleteLead = canDelete(lead);

                return (
                    <motion.div
                        key={lead.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="min-w-0"
                    >
                        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-4 sm:p-6">
                                <div className="space-y-4">
                                    {/* Header */}
                                    <div className="flex items-start gap-3 min-w-0">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center shadow-md shrink-0">
                                            <span className="text-white font-bold text-base sm:text-lg">
                                                {lead.name?.[0]?.toUpperCase() || 'L'}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-900 text-base sm:text-lg leading-tight">
                                                {lead.name}
                                            </h3>
                                            <Badge className={`${statusInfo.color} shadow-sm text-xs mt-2`}>
                                                {statusInfo.label}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-2 min-w-0">
                                        {lead.email && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span className="truncate">{lead.email}</span>
                                            </div>
                                        )}
                                        {lead.phone && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>{lead.phone}</span>
                                            </div>
                                        )}
                                        {lead.assignedUserId && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <User className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span className="truncate">Atribuído</span>
                                            </div>
                                        )}
                                        {lead.createdAt && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span className="truncate">
                                                    Criado em {format(new Date(lead.createdAt), "dd/MM/yyyy")}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    {(canEditLead || canDeleteLead || canUpdateStatus(lead)) && (
                                        <div className="flex gap-2 pt-4 border-t border-slate-100 flex-wrap">
                                            {canUpdateStatus(lead) && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onUpdateStatus(lead)}
                                                    className="flex-1 min-w-[120px] hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300"
                                                >
                                                    <GitBranchPlus className="w-4 h-4 mr-2" />
                                                    Status
                                                </Button>
                                            )}
                                            {canEditLead && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onEdit(lead)}
                                                    className="flex-1 min-w-[100px] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                                                >
                                                    <Pencil className="w-4 h-4 mr-2" />
                                                    Editar
                                                </Button>
                                            )}
                                            {canDeleteLead && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onDelete(lead.id)}
                                                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            })}
        </div>

    );
}
