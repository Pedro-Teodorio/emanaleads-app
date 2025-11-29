import React, { useState, useEffect } from "react";
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
  FormDescription,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "../types/user";
import { useForm } from "react-hook-form";
import { userFormSchema, UserFormSchema } from "../schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSubmit: (data: UserFormSchema) => void;
  loading: boolean;
}

export default function UserFormDialog({ open, onOpenChange, onSubmit, loading, user }: Readonly<UserFormDialogProps>) {
  const [showPassword, setShowPassword] = useState(false);
  const [sendInvite, setSendInvite] = useState(!user); // Default true para novos usuários

  const form = useForm<UserFormSchema>({
    values: user || {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "ADMIN",
      status: "ACTIVE",
    },
    mode: "onChange",
    resolver: zodResolver(userFormSchema),
  })

  // Reset sendInvite quando abrir/fechar dialog
  useEffect(() => {
    if (open && !user) {
      setSendInvite(true);
      form.setValue('password', undefined);
    }
  }, [open, user, form]);

  // Quando alternar sendInvite, limpar ou habilitar campo senha
  const handleInviteToggle = (checked: boolean) => {
    setSendInvite(checked);
    if (checked) {
      form.setValue('password', undefined);
    } else {
      form.setValue('password', '');
    }
  };



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{user ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
          <DialogDescription>
            {user ? "Edite as informações do usuário abaixo." : "Preencha os campos abaixo para criar um novo usuário."}
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
                    <Input placeholder="Digite seu nome" className='h-11'{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" className='h-11'{...field} />
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
                    <Input placeholder="Digite seu telefone" className='h-11'{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Toggle: Enviar convite por email (apenas para criação) */}
            {!user && (
              <div className="flex items-center space-x-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-900">
                <Switch
                  id="send-invite"
                  checked={sendInvite}
                  onCheckedChange={handleInviteToggle}
                />
                <Label htmlFor="send-invite" className="text-sm font-medium cursor-pointer">
                  Enviar convite por email
                </Label>
              </div>
            )}

            {/* Campo senha: oculto se sendInvite estiver ativo */}
            {!user && !sendInvite && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Digite a senha"
                          className='h-11'
                          {...field}
                          value={field.value || ''}
                        />
                        <Button
                          variant="link"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-0 text-sm"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Alerta quando convite estiver ativo */}
            {!user && sendInvite && (
              <div className="flex items-start space-x-2 p-3 bg-green-50 dark:bg-green-950 rounded-md border border-green-200 dark:border-green-900">
                <Mail className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <p className="text-xs text-green-700 dark:text-green-300">
                  Um email de ativação será enviado para o usuário. O link será válido por 7 dias.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Função</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full h-11">
                          <SelectValue placeholder="Selecione uma função" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ROOT">Super Administrador</SelectItem>
                        <SelectItem value="ADMIN">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />


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
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Ativo</SelectItem>
                        <SelectItem value="INACTIVE">Inativo</SelectItem>
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
                {loading && "Salvando..."}
                {!loading && user && "Atualizar"}
                {!loading && !user && "Criar"}
              </Button>
            </DialogFooter>

          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
}