"use client"

import { PageActions, PageContainer } from "@/components/common/Page";
import { PageTitle } from "@/components/common/Page";
import { PageDescription } from "@/components/common/Page";
import { PageHeader } from "@/components/common/Page";
import { PageContent } from "@/components/common/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserFormDialog from "@/features/users/components/UserCreateFormDialog";
import UserGrid from "@/features/users/components/UserGrid";
import { useCreateUserMutation } from "@/features/users/services/mutations";
import { usersQueries } from "@/features/users/services/queries";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";


export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const { data, isLoading } = useQuery(usersQueries.all());
    const { mutate: createUser, isPending: createLoading } = useCreateUserMutation(setDialogOpen);

    return (
        <>
            <PageContainer>
                <PageHeader>
                    <div className="flex flex-col gap-2">
                        <PageTitle>Usuários</PageTitle>
                        <PageDescription>Gerencie os usuários do sistema Emanaleads</PageDescription>
                    </div>
                    <PageActions>
                        <Button className="w-full bg-blue-900 text-white hover:bg-blue-800" onClick={() => setDialogOpen(true)}>
                            <PlusCircle className="inline-block size-4" />
                            Novo Usuário
                        </Button>
                    </PageActions>
                </PageHeader>
                <PageContent container>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Buscar por nome ou email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <UserGrid users={data || []} loading={isLoading} />
                </PageContent>
            </PageContainer>
            <UserFormDialog
                loading={createLoading}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={async (user) => {
                    await createUser(user);
                }}
            />
        </>
    );
}