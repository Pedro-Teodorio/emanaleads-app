import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteUserMutation } from "../services/mutations";

interface UserDeleteDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    userId: string;
}
export default function UserDeleteDialog({
    isOpen,
    onOpenChange,
    userId
}: UserDeleteDialogProps) {
    const { mutate: deleteUser, isPending: deleteLoading } = useDeleteUserMutation(onOpenChange);
    return (
        <Dialog
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Confirmar Excluir Usuário</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir este usuário?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button type="button" onClick={() => deleteUser(userId)} disabled={deleteLoading} className="bg-red-900 text-white hover:bg-red-800">
                        {deleteLoading ? "Excluindo..." : "Excluir"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
