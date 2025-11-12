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
import { useState } from "react";
import UserDeleteDialog from "@/features/users/components/UserDeleteDialog";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/common/AppPagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roleConfig, statusConfig } from "@/features/users/constants/users";


export default function UsersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parâmetros de paginação e busca da URL
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6'); // Mantendo 'limit' para a API
  const search = searchParams.get('search') || '';
  const role = searchParams.get('role') || '';
  const status = searchParams.get('status') || '';

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState(search);
  const [currentRole, setCurrentRole] = useState(role);
  const [currentStatus, setCurrentStatus] = useState(status);


  const { data: usersData, isLoading } = useQuery(
    usersQueries.list({ page, limit, search, role, status })
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
    if (currentRole) {
      newSearchParams.set('role', currentRole);
    } else {
      newSearchParams.delete('role');
    }
    if (currentStatus) {
      newSearchParams.set('status', currentStatus);
    } else {
      newSearchParams.delete('status');
    }
    newSearchParams.set('page', '1'); // Resetar para a primeira página ao buscar
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleClearSearch = () => {
    setCurrentSearchTerm("");
    setCurrentRole("");
    setCurrentStatus("");
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('search');
    newSearchParams.delete('role');
    newSearchParams.delete('status');
    newSearchParams.set('page', '1');
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', newPage.toString());
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

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
          <div key={`${search}-${role}-${status}`} className="flex flex-col md:flex-row gap-2 mb-2" >
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar por nome do usuário"
                value={currentSearchTerm}
                onChange={(e) => setCurrentSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={currentRole} onValueChange={setCurrentRole}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por cargo" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(roleConfig).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={currentStatus} onValueChange={setCurrentStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusConfig).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className=" bg-blue-900 text-white hover:bg-blue-800" onClick={handleSearch}>
              Buscar
            </Button>
            {
              (currentSearchTerm || currentRole || currentStatus) && (
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