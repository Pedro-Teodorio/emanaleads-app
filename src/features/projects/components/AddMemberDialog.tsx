"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Mail } from "lucide-react";

interface AddMemberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreateNew: (userData: { name: string; email: string; phone?: string; password?: string }) => void;
    loading: boolean;
}
export function AddMemberDialog({ open, onOpenChange, onCreateNew, loading }: Readonly<AddMemberDialogProps>) {
    const [newUserData, setNewUserData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [sendInvite, setSendInvite] = useState(true); // Default: enviar convite
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        // Se sendInvite estiver ativo, não enviar senha (undefined)
        const dataToSend = {
            ...newUserData,
            password: sendInvite ? undefined : newUserData.password || undefined,
        };
        onCreateNew(dataToSend);
        setNewUserData({ name: "", email: "", phone: "", password: "" });
        setSendInvite(true);
    };

    const handleInviteToggle = (checked: boolean) => {
        setSendInvite(checked);
        if (checked) {
            setNewUserData({ ...newUserData, password: "" });
        }
    };

    const isValid = !!(newUserData.name && newUserData.email && (sendInvite || newUserData.password));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Membro</DialogTitle>
                    <DialogDescription>Crie um novo usuário PROJECT_USER para este projeto.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="name">Nome *</Label>
                        <Input
                            id="name"
                            placeholder="Nome completo"
                            value={newUserData.name}
                            onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="email@exemplo.com"
                            value={newUserData.email}
                            onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                            id="phone"
                            placeholder="(00) 00000-0000"
                            value={newUserData.phone}
                            onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                        />
                    </div>

                    {/* Toggle: Enviar convite por email */}
                    <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-900">
                        <Switch
                            id="send-invite-member"
                            checked={sendInvite}
                            onCheckedChange={handleInviteToggle}
                        />
                        <Label htmlFor="send-invite-member" className="text-sm font-medium cursor-pointer">
                            Enviar convite por email
                        </Label>
                    </div>

                    {/* Campo senha: apenas se sendInvite estiver desativado */}
                    {!sendInvite && (
                        <div>
                            <Label htmlFor="password">Senha *</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Mínimo 8 caracteres"
                                    value={newUserData.password}
                                    onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
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
                            <p className="text-xs text-muted-foreground mt-1">
                                Mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial
                            </p>
                        </div>
                    )}

                    {/* Alerta quando convite estiver ativo */}
                    {sendInvite && (
                        <div className="flex items-start space-x-2 p-3 bg-green-50 dark:bg-green-950 rounded-md border border-green-200 dark:border-green-900">
                            <Mail className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                            <p className="text-xs text-green-700 dark:text-green-300">
                                Um email de ativação será enviado para o membro. O link será válido por 7 dias.
                            </p>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={!isValid || loading}>
                        {loading ? <Spinner /> : "Adicionar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
