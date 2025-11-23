"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AddMemberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    availableUsers: User[];
    onSubmit: (userId: string) => void;
    loading: boolean;
}

export function AddMemberDialog({ open, onOpenChange, availableUsers, onSubmit, loading }: Readonly<AddMemberDialogProps>) {
    const [selectedUserId, setSelectedUserId] = useState<string>("");

    const handleSubmit = () => {
        if (selectedUserId) {
            onSubmit(selectedUserId);
            setSelectedUserId("");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Membro</DialogTitle>
                    <DialogDescription>
                        Selecione um usuário PROJECT_USER para adicionar ao projeto.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um usuário" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableUsers.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={!selectedUserId || loading}>
                        {loading ? <Spinner /> : "Adicionar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
