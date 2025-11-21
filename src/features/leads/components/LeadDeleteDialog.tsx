import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LeadDeleteDialogProps {
    readonly open: boolean;
    readonly onOpenChange: (open: boolean) => void;
    readonly onSubmit: (id: string) => void;
    readonly leadId: string;
    readonly loading: boolean;
}

export default function LeadDeleteDialog({
    open,
    onOpenChange,
    onSubmit,
    leadId,
    loading
}: LeadDeleteDialogProps) {

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar Excluir Lead</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir este lead?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        onClick={() => onSubmit(leadId)}
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
