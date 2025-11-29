import React, { useEffect } from "react";
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
import { Lead } from "../types/leads";
import { useForm } from "react-hook-form";
import { leadFormSchema, LeadFormSchema } from "../schemas/lead";
import { zodResolver } from "@hookform/resolvers/zod";

interface LeadFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    lead?: Lead;
    onSubmit: (data: LeadFormSchema) => void;
    loading: boolean;
}

export default function LeadFormDialog({ open, onOpenChange, onSubmit, loading, lead }: LeadFormDialogProps) {

    const form = useForm<LeadFormSchema>({
        defaultValues: {
            name: lead?.name ?? "",
            email: lead?.email ?? "",
            phone: lead?.phone ?? "",
            requestType: lead?.requestType ?? "",
            position: lead?.position ?? "",
        },
        mode: "onChange",
        resolver: zodResolver(leadFormSchema),
    });

    useEffect(() => {
        form.reset({
            name: lead?.name ?? "",
            email: lead?.email ?? "",
            phone: lead?.phone ?? "",
            requestType: lead?.requestType ?? "",
            position: lead?.position ?? "",
        });
    }, [lead, form]);

    const handleSubmit = (data: LeadFormSchema) => {
        // Limpar strings vazias antes de enviar
        const cleanedData = {
            ...data,
            email: data.email || undefined,
            phone: data.phone || undefined,
            requestType: data.requestType || undefined,
            position: data.position || undefined,
        };
        onSubmit(cleanedData as LeadFormSchema);
    };

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
