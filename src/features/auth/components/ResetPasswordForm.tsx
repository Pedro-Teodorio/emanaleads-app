'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema, resetPasswordSchema } from '../schemas/resetPasswordSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { useResetPassword } from '../hooks/useResetPassword';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ResetPasswordFormProps {
    token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { mutate: resetPassword, isPending } = useResetPassword(token);

    const form = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { newPassword: '', confirmPassword: '' },
    });

    const onSubmit = (data: ResetPasswordSchema) => {
        resetPassword({ newPassword: data.newPassword });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nova Senha</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Digite sua nova senha"
                                        className='h-11'
                                        {...field}
                                    />
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-0 text-sm"
                                        onClick={() => setShowPassword(!showPassword)}
                                        type="button"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                                Mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmar Nova Senha</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirme sua nova senha"
                                        className='h-11'
                                        {...field}
                                    />
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-0 text-sm"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        type="button"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    loading={isPending}
                    className="w-full bg-blue-700 hover:bg-blue-800 h-11"
                >
                    {isPending ? 'Resetando...' : 'Resetar senha'}
                </Button>
            </form>
        </Form>
    );
};
