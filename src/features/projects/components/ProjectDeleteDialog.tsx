import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProjectDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (id: string) => void;
    projectId: string;
    loading: boolean;
}

export default function ProjectDeleteDialog({
    open,
    onOpenChange,
    onSubmit,
    projectId,
    loading
}: ProjectDeleteDialogProps) {
    
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar Excluir Projeto</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir este projeto?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button 
                        type="button" 
                        onClick={() => onSubmit(projectId)} 
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
