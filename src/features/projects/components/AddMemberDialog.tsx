"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

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

    const handleSubmit = () => {
        onCreateNew(newUserData);
        setNewUserData({ name: "", email: "", phone: "", password: "" });
    };

    const isValid = !!(newUserData.name && newUserData.email);

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
                    <div>
                        <Label htmlFor="password">Senha (opcional)</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Mínimo 6 caracteres (padrão: 123456)"
                            value={newUserData.password}
                            onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                        />
                    </div>
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
