"use client";

import { PageContainer, PageContent, PageHeader, PageTitle, PageDescription, PageActions } from "@/components/common/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useProjectMembers, useAddProjectMember, useRemoveProjectMember } from "@/features/projects/hooks/useProjectMembers";
import { AddMemberDialog } from "@/features/projects/components/AddMemberDialog";
import { RemoveMemberDialog } from "@/features/projects/components/RemoveMemberDialog";
import { useState } from "react";
import { UserPlus, Trash2, User, Mail, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserList } from "@/features/users/services/users";
import { usePermissions } from "@/hooks/usePermissions";

export default function ProjectMembersPage() {
    const { id } = useParams<{ id: string }>();
    const permissions = usePermissions();
    const { data: membersData, isLoading } = useProjectMembers(id);
    const { data: usersData } = useQuery({
        queryKey: ['users-list-all'],
        queryFn: () => fetchUserList({ page: 1, limit: 100 }),
        enabled: permissions.role === 'ROOT' || permissions.role === 'ADMIN',
    });

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<{ id: string; name: string } | null>(null);

    const { mutate: addMember, isPending: isAdding } = useAddProjectMember(id);
    const { mutate: removeMember, isPending: isRemoving } = useRemoveProjectMember(id);

    const handleAddMember = (userId: string) => {
        addMember(userId, {
            onSuccess: () => setAddDialogOpen(false),
        });
    };

    const handleRemoveMember = () => {
        if (selectedMember) {
            removeMember(selectedMember.id, {
                onSuccess: () => {
                    setRemoveDialogOpen(false);
                    setSelectedMember(null);
                },
            });
        }
    };

    const availableUsers = usersData?.data.filter((u) =>
        u.role === 'PROJECT_USER' &&
        !membersData?.members.some((m) => m.user.id === u.id)
    ) || [];

    if (isLoading) {
        return (
            <PageContainer>
                <PageHeader>
                    <div className="flex flex-col gap-2">
                        <PageTitle>Membros do Projeto</PageTitle>
                        <PageDescription>Carregando...</PageDescription>
                    </div>
                </PageHeader>
                <PageContent container>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardContent className="p-6">
                                    <Skeleton className="h-16 w-full" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </PageContent>
            </PageContainer>
        );
    }

    return (
        <>
            <PageContainer>
                <PageHeader>
                    <div className="flex flex-col gap-2">
                        <PageTitle>Membros do Projeto</PageTitle>
                        <PageDescription>
                            Gerencie os membros que têm acesso a este projeto
                        </PageDescription>
                    </div>
                    <PageActions>
                        <Button
                            className="bg-blue-900 text-white hover:bg-blue-800"
                            onClick={() => setAddDialogOpen(true)}
                        >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Adicionar Membro
                        </Button>
                    </PageActions>
                </PageHeader>
                <PageContent container>
                    <div className="space-y-6">
                        {/* Admin Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    Administrador
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {membersData?.members.find((m) => m.user.id === membersData.admin) && (
                                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                                                <span className="text-white font-semibold text-lg">
                                                    {membersData.members.find((m) => m.user.id === membersData.admin)?.user.name[0].toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-slate-900">
                                                        {membersData.members.find((m) => m.user.id === membersData.admin)?.user.name}
                                                    </span>
                                                    <Badge className="bg-blue-600">ADMIN</Badge>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                                                    <Mail className="w-4 h-4" />
                                                    {membersData.members.find((m) => m.user.id === membersData.admin)?.user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Members Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <User className="w-5 h-5 text-green-600" />
                                    Membros ({membersData?.members.filter((m) => m.user.id !== membersData.admin).length || 0})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {membersData?.members.filter((m) => m.user.id !== membersData.admin).length === 0 ? (
                                    <div className="text-center py-8 text-slate-500">
                                        Nenhum membro adicionado ainda
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {membersData?.members
                                            .filter((m) => m.user.id !== membersData.admin)
                                            .map((member) => (
                                                <div
                                                    key={member.id}
                                                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                                                            <span className="text-white font-semibold text-lg">
                                                                {member.user.name[0].toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-slate-900">
                                                                    {member.user.name}
                                                                </span>
                                                                <Badge className="bg-green-600">PROJECT_USER</Badge>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                                                                <Mail className="w-4 h-4" />
                                                                {member.user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedMember({ id: member.id, name: member.user.name });
                                                            setRemoveDialogOpen(true);
                                                        }}
                                                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </PageContent>
            </PageContainer>

            <AddMemberDialog
                open={addDialogOpen}
                onOpenChange={setAddDialogOpen}
                availableUsers={availableUsers}
                onSubmit={handleAddMember}
                loading={isAdding}
            />

            {selectedMember && (
                <RemoveMemberDialog
                    open={removeDialogOpen}
                    onOpenChange={setRemoveDialogOpen}
                    memberName={selectedMember.name}
                    onConfirm={handleRemoveMember}
                    loading={isRemoving}
                />
            )}
        </>
    );
}
