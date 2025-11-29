"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface RemoveMemberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    memberName: string;
    onConfirm: () => void;
    loading: boolean;
}

export function RemoveMemberDialog({ open, onOpenChange, memberName, onConfirm, loading }: Readonly<RemoveMemberDialogProps>) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Remover Membro</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja remover <strong>{memberName}</strong> do projeto?
                        Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} disabled={loading}>
                        {loading ? <Spinner /> : "Remover"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
