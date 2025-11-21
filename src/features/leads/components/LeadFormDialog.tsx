import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lead } from "../types/leads";
import { useForm } from "react-hook-form";
import { leadFormSchema, LeadFormSchema } from "../schemas/lead";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { projectsQueries } from "@/features/projects/services/queries";
import { usersQueries } from "@/features/users/services/queries";

interface LeadFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    lead?: Lead;
    onSubmit: (data: LeadFormSchema) => void;
    loading: boolean;
}

export default function LeadFormDialog({ open, onOpenChange, onSubmit, loading, lead }: LeadFormDialogProps) {

    const form = useForm<LeadFormSchema>({
        values: lead || {
            name: "",
            email: "",
            phone: "",
            projectId: "",
            assignedUserId: "",
            requestType: "",
            position: "",
        },
        mode: "onChange",
        resolver: zodResolver(leadFormSchema),
    });

    const handleSubmit = (data: LeadFormSchema) => {
        // Limpar strings vazias antes de enviar
        const cleanedData = {
            ...data,
            email: data.email || undefined,
            phone: data.phone || undefined,
            assignedUserId: data.assignedUserId || undefined,
            requestType: data.requestType || undefined,
            position: data.position || undefined,
        };
        onSubmit(cleanedData as LeadFormSchema);
    };

    // Fetch projects for dropdown (ROOT sees all, ADMIN sees own projects)
    const { data: projectsData } = useQuery(
        projectsQueries.list({ page: 1, limit: 100, search: "", status: "" })
    );

    // Fetch users for assignedUserId dropdown
    const { data: usersData } = useQuery(
        usersQueries.list({ page: 1, limit: 100, search: "", role: "", status: "" })
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{lead ? "Editar Lead" : "Novo Lead"}</DialogTitle>
                    <DialogDescription>
                        {lead ? "Edite as informações do lead abaixo." : "Preencha os campos abaixo para criar um novo lead."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome do lead" className='h-11' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o e-mail" className='h-11' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o telefone" className='h-11' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="projectId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Projeto *</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full h-11">
                                                <SelectValue placeholder="Selecione um projeto" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {projectsData?.data.map((project) => (
                                                <SelectItem key={project.id} value={project.id}>
                                                    {project.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="assignedUserId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Atribuído a (opcional)</FormLabel>
                                    <div className="flex gap-2">
                                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-11">
                                                    <SelectValue placeholder="Selecione um usuário" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {usersData?.data.map((user) => (
                                                    <SelectItem key={user.id} value={user.id}>
                                                        {user.name} ({user.email})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {field.value && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-11 w-11 shrink-0"
                                                onClick={() => field.onChange("")}
                                            >
                                                ×
                                            </Button>
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="requestType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Solicitação</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Orçamento, Consultoria" className='h-11' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="position"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cargo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Gerente, Diretor" className='h-11' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => {
                                onOpenChange(false);
                                form.reset();
                            }}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={loading} className="bg-blue-900 text-white hover:bg-blue-800">
                                {(() => {
                                    if (loading) return "Salvando...";
                                    return lead ? "Atualizar" : "Criar";
                                })()}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
