import React from 'react';

export interface NormalizedError {
    field: string;
    message: string;
    code?: string;
}

interface FormErrorProps {
    errors?: NormalizedError[];
    field?: string; // se definido, mostra só erros daquele campo
    className?: string;
}

// Componente simples que lista erros de formulário com semântica acessível
export const FormError: React.FC<FormErrorProps> = ({ errors, field, className }) => {
    if (!errors || errors.length === 0) return null;
    const filtered = field ? errors.filter(e => e.field === field) : errors;
    if (filtered.length === 0) return null;

    return (
        <ul role="alert" aria-live="assertive" className={className || 'mt-1 text-sm text-red-600 space-y-1'}>
            {filtered.map((err) => (
                <li key={`${err.field}:${err.message}`} data-field={err.field}>
                    {err.message}
                </li>
            ))}
        </ul>
    );
};

export default FormError;
