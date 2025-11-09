import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Phone, Calendar, UserX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { format } from "date-fns";
import { roleConfig, } from "@/mocks/users";
import { User } from "../types/user";

const statusConfig = {
    ACTIVE: { label: "Ativo", color: "bg-green-100 text-green-800 border-green-200" },
    INACTIVE: { label: "Inativo", color: "bg-gray-100 text-gray-800 border-gray-200" },
};

interface UserGridProps {
    users: User[];
    loading: boolean;
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

export default function UserGrid({ users, loading, onEdit, onDelete }: UserGridProps) {



    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className="border-0 shadow-md">
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

    if (users.length === 0) {
        return (
            <div className="text-center py-12">
                <UserX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">Nenhum usuário encontrado</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user, index) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="min-w-0"
                    >
                        <Card className=" shadow-md hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-4 sm:p-6">
                                <div className="space-y-4">
                                    {/* Header */}
                                    <div className="flex items-start gap-3 min-w-0">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center shadow-md shrink-0">
                                            <span className="text-white font-bold text-base  sm:text-lg">
                                                {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-900 text-base sm:text-lg leading-tight">
                                                {user.name || 'Usuário sem nome'}
                                            </h3>
                                            <p className="text-sm text-slate-500 truncate mt-0.5">{user.email}</p>
                                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                <Badge className={`${roleConfig[user.role]?.color} shadow-sm text-xs`}>
                                                    {roleConfig[user.role]?.label}
                                                </Badge>
                                                <Badge variant="outline" className={`${statusConfig[user.status as keyof typeof statusConfig]?.color} border text-xs`}>
                                                    {statusConfig[user.status as keyof typeof statusConfig]?.label}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-2 min-w-0">

                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                                            {
                                                user.phone || 'Nenhum número de telefone cadastrado'
                                            }
                                        </div>

                                        {user.createdAt && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span className="truncate">Criado em {format(new Date(user.createdAt), "dd/MM/yyyy")}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}

                                    <div className="flex gap-2 pt-4 border-t border-slate-100">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => { onEdit(user) }}
                                            className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                                        >
                                            <Pencil className="w-4 h-4 mr-2" />
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => { onDelete(user.id); }}
                                            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>


        </>
    );
}