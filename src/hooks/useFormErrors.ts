import { useState } from 'react';
import axios from 'axios';
import { NormalizedError } from '@/components/common/FormError';

interface UseFormErrorsResult {
	errors: NormalizedError[];
	setErrors: (errors: NormalizedError[]) => void;
	normalizeError: (error: unknown) => NormalizedError[];
	clearErrors: () => void;
}
type ZodIssue = {
	path?: (string | number)[];
	message?: string;
	code?: string;
};
// Normaliza respostas de erro vindas da API (validation ou ApiError)
export function useFormErrors(): UseFormErrorsResult {
	const [errors, setErrors] = useState<NormalizedError[]>([]);

	function clearErrors() {
		setErrors([]);
	}

	function normalizeError(error: unknown): NormalizedError[] {
		// Zod validation: { code: 'VALIDATION_ERROR', errors: issues[] }
		if (axios.isAxiosError(error)) {
			const responseData = error.response?.data;
			if (responseData) {
				// Validation errors
				if (Array.isArray(responseData.errors)) {
					const normalized = responseData.errors.map((issue: ZodIssue) => ({
						field: Array.isArray(issue.path) && issue.path.length > 0 ? String(issue.path.at(-1)) : '_global',
						message: issue.message || 'Erro de validação',
						code: responseData.code || issue.code,
					}));
					setErrors(normalized);
					return normalized;
				}
				// ApiError pattern { code, message }
				if (responseData.message) {
					const single: NormalizedError = {
						field: '_global',
						message: responseData.message,
						code: responseData.code,
					};
					setErrors([single]);
					return [single];
				}
			}
		}
		// Fallback desconhecido
		const fallback: NormalizedError = { field: '_global', message: 'Erro inesperado', code: 'UNKNOWN_ERROR' };
		setErrors([fallback]);
		return [fallback];
	}

	return { errors, setErrors, normalizeError, clearErrors };
}
