import { User } from "@/features/users/types/user";
import { projectFormSchema, ProjectFormSchema } from "../schemas/projects";
import { Project } from "../types/projects";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ProjectFormDialogProps {
    open: boolean;
    loading: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: ProjectFormSchema) => void;
    users?: User[];
    project?: Project;
}

export default function ProjectFormDialog({
    open,
    loading,
    onOpenChange,
    onSubmit,
    users,
    project,
}: ProjectFormDialogProps) {
    const form = useForm<ProjectFormSchema>({
        values: project ? {
            name: project.name,
            status: project.status,
            adminId: project.adminId,
            description: project.description,
        } : {
            name: '',
            status: 'PLANNING',
            adminId: '',
            description: '',
        },
        mode: 'onChange',
        resolver: zodResolver(projectFormSchema),
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{project ? 'Editar Projeto' : 'Novo Projeto'}</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para {project ? 'editar' : 'criar'} um projeto.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome do projeto" className="h-11" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Digite a descrição do projeto" className="h-24" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-11">
                                                    <SelectValue placeholder="Selecione um status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="PLANNING">Planejamento</SelectItem>
                                                <SelectItem value="ACTIVE">Ativo</SelectItem>
                                                <SelectItem value="PAUSED">Pausado</SelectItem>
                                                <SelectItem value="COMPLETED">Concluído</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="adminId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Administrador</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-11">
                                                    <SelectValue placeholder="Selecione um administrador" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    users?.map((item) => (
                                                        <SelectItem key={item.id} value={item.id}>
                                                            {item.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => {
                                onOpenChange(false)
                                form.reset()
                            }}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={loading} className="bg-blue-900 text-white hover:bg-blue-800">
                                {loading ? "Salvando..." : project ? "Atualizar" : "Criar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}