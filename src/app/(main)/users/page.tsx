"use client"

import { PageActions, PageContainer } from "@/components/common/Page";
import { PageTitle } from "@/components/common/Page";
import { PageDescription } from "@/components/common/Page";
import { PageHeader } from "@/components/common/Page";
import { PageContent } from "@/components/common/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserFormDialog from "@/features/users/components/UserFormDialog";
import UserGrid from "@/features/users/components/UserGrid";
import { useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation } from "@/features/users/services/mutations";
import { usersQueries } from "@/features/users/services/queries";
import { User } from "@/features/users/types/user";
import { UserFormSchema } from "@/features/users/schemas/user";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";
import { useState, useEffect } from "react";
import UserDeleteDialog from "@/features/users/components/UserDeleteDialog";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/common/AppPagination";


export default function UsersPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Parâmetros de paginação e busca da URL
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6'); // Mantendo 'limit' para a API
    const search = searchParams.get('search') || '';

    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [currentSearchTerm, setCurrentSearchTerm] = useState(search);


    const { data: usersData, isLoading } = useQuery(
        usersQueries.list({ page, limit, search })
    );

    const { mutate: createUser, isPending: createLoading } = useCreateUserMutation({ setDialogOpen, setEditingUser });
    const { mutate: updateUser, isPending: updateLoading } = useUpdateUserMutation({ setDialogOpen, setEditingUser });
    const { mutate: deleteUser, isPending: deleteLoading } = useDeleteUserMutation({ setDeleteDialogOpen });

    const handleSubmit = (data: UserFormSchema) => {
        if (editingUser) {
            updateUser({ id: editingUser.id, user: data });
        } else {
            createUser(data);
        }
    }
    const handleEdit = (user: User) => {
        setEditingUser(user);
        setDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setDeleteDialogOpen(true);
        setDeleteId(id);
    }

    const handleSearch = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (currentSearchTerm) {
            newSearchParams.set('search', currentSearchTerm);
        } else {
            newSearchParams.delete('search');
        }
        newSearchParams.set('page', '1'); // Resetar para a primeira página ao buscar
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    const handleClearSearch = () => {
        setCurrentSearchTerm("");
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete('search');
        newSearchParams.set('page', '1');
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('page', newPage.toString());
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };



    useEffect(() => {
        setCurrentSearchTerm(search);
    }, [search]);


    return (
        <>
            <PageContainer>
                <PageHeader>
                    <div className="flex flex-col gap-2">
                        <PageTitle>Usuários</PageTitle>
                        <PageDescription>Gerencie os usuários do sistema Emanaleads</PageDescription>
                    </div>
                    <PageActions>
                        <Button className="w-full bg-blue-900 text-white hover:bg-blue-800" onClick={() => {
                            setDialogOpen(true)
                            setEditingUser(null);
                        }}>
                            <PlusCircle className="inline-block size-4" />
                            Novo Usuário
                        </Button>
                    </PageActions>
                </PageHeader>
                <PageContent container >
                    <div className="flex  gap-2" >
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Buscar por nome"
                                value={currentSearchTerm}
                                onChange={(e) => setCurrentSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button className=" bg-blue-900 text-white hover:bg-blue-800" onClick={handleSearch}>
                            Buscar
                        </Button>
                        {
                            currentSearchTerm && (
                                <Button variant="outline" onClick={handleClearSearch}>
                                    Limpar
                                </Button>
                            )
                        }

                    </div>
                    <UserGrid
                        users={usersData?.data || []}
                        loading={isLoading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    {usersData && (
                        <div className="mt-8">
                            <Pagination
                                pagination={{
                                    total: usersData.meta.total,
                                    page: usersData.meta.page,
                                    perPage: usersData.meta.limit, // Mapeando 'limit' para 'perPage'
                                }}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </PageContent>
            </PageContainer>
            <UserFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                user={editingUser || undefined}
                onSubmit={handleSubmit}
                loading={createLoading || updateLoading}
            />

            <UserDeleteDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onSubmit={deleteUser}
                loading={deleteLoading}
                userId={deleteId}
            />
        </>
    );
}