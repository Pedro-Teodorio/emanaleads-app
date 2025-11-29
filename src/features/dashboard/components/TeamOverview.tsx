import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/features/users/types/user";
import { roleConfig } from "@/features/users/constants/users";


export default function TeamOverview({ users, loading }: { users: User[], loading: boolean }) {
    const roleStats = React.useMemo(() => {
        const stats = { ROOT: 0, ADMIN: 0, PROJECT_USER: 0 };
        users.forEach(user => {
            if (user.role in stats) stats[user.role]++;
        });
        return stats;
    }, [users]);

    return (
        <Card className="border-0 shadow-md">
            <CardHeader className="border-b border-slate-200 pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Users className="w-5 h-5 text-slate-600" />
                    Visão da Equipe
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                {loading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-12" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {Object.entries(roleStats)
                            .filter(([role]) => role !== 'PROJECT_USER')
                            .map(([role, count]) => (
                                <div
                                    key={role}
                                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Badge className={`${roleConfig[role as keyof typeof roleConfig]?.color} border`}>
                                            {roleConfig[role as keyof typeof roleConfig]?.label}
                                        </Badge>
                                    </div>
                                    <span className="text-2xl font-bold text-slate-900">{count}</span>
                                </div>
                            ))}
                    </div>
                )}

                {!loading && users.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-slate-900">{users.length}</p>
                            <p className="text-sm text-slate-600 mt-1">Total de usuários</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}