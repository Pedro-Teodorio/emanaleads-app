import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UserDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (id: string) => void;
    userId: string;
    loading: boolean;
}

export default function UserDeleteDialog({
    open,
    onOpenChange,
    onSubmit,
    userId,
    loading
}: UserDeleteDialogProps) {
    
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar Excluir Usuário</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir este usuário?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button 
                        type="button" 
                        onClick={() => onSubmit(userId)} 
                        disabled={loading} 
                        className="bg-red-700 text-white hover:bg-red-800"
                    >
                        {loading ? "Excluindo..." : "Excluir"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
