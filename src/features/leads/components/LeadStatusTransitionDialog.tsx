import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { getNextStatuses, requiresReason, type LeadStatus } from "@/lib/rbac";
import { leadStatusConfig } from "../constants/leads";
import { AlertCircle } from "lucide-react";

interface LeadStatusTransitionDialogProps {
    readonly open: boolean;
    readonly onOpenChange: (open: boolean) => void;
    readonly currentStatus: LeadStatus;
    readonly onSubmit: (toStatus: LeadStatus, reason?: string) => void;
    readonly loading: boolean;
}

export default function LeadStatusTransitionDialog({
    open,
    onOpenChange,
    currentStatus,
    onSubmit,
    loading
}: LeadStatusTransitionDialogProps) {
    const [selectedStatus, setSelectedStatus] = useState<LeadStatus | "">("");
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const nextStatuses = getNextStatuses(currentStatus);
    const needsReason = selectedStatus && requiresReason(selectedStatus);

    const handleSubmit = () => {
        if (!selectedStatus) {
            setError("Selecione um novo status");
            return;
        }

        if (needsReason && !reason.trim()) {
            setError("Motivo é obrigatório para status final");
            return;
        }

        if (reason && reason.trim().length < 2) {
            setError("Motivo deve ter ao menos 2 caracteres");
            return;
        }

        setError("");
        onSubmit(selectedStatus, reason || undefined);
    };

    const handleClose = () => {
        setSelectedStatus("");
        setReason("");
        setError("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Atualizar Status do Lead</DialogTitle>
                    <DialogDescription>
                        Status atual: <span className="font-semibold">{leadStatusConfig[currentStatus].label}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="status">Novo Status *</Label>
                        <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as LeadStatus)}>
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Selecione o próximo status" />
                            </SelectTrigger>
                            <SelectContent>
                                {nextStatuses.length === 0 ? (
                                    <SelectItem value="none" disabled>
                                        Nenhuma transição disponível
                                    </SelectItem>
                                ) : (
                                    nextStatuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {leadStatusConfig[status].label}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {needsReason && (
                        <div className="space-y-2">
                            <Label htmlFor="reason">Motivo *</Label>
                            <Textarea
                                id="reason"
                                placeholder="Digite o motivo da mudança de status..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={3}
                                className="resize-none"
                            />
                            <p className="text-xs text-slate-500">
                                Obrigatório para status finais (mínimo 2 caracteres)
                            </p>
                        </div>
                    )}

                    {!needsReason && selectedStatus && (
                        <div className="space-y-2">
                            <Label htmlFor="reason-optional">Motivo (opcional)</Label>
                            <Textarea
                                id="reason-optional"
                                placeholder="Adicione um comentário sobre a mudança..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={3}
                                className="resize-none"
                            />
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading || nextStatuses.length === 0}
                        className="bg-blue-900 text-white hover:bg-blue-800"
                    >
                        {loading ? "Atualizando..." : "Atualizar Status"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
