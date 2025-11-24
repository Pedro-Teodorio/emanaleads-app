import { z } from 'zod';

// Política de senha idêntica ao backend
export const passwordPolicyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const passwordPolicyMessage = 'Senha deve ter mínimo 8 caracteres e incluir maiúscula, minúscula, número e caractere especial';

export const passwordSchema = z.string().min(8, 'Senha deve ter no mínimo 8 caracteres').regex(passwordPolicyRegex, passwordPolicyMessage);

export const optionalPasswordSchema = passwordSchema.optional();
