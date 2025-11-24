'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivateAccountSchema, activateAccountSchema } from '../schemas/activateAccountSchema';
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
import { useActivateAccount } from '../hooks/useActivateAccount';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ActivateAccountFormProps {
    token: string;
}

export const ActivateAccountForm = ({ token }: ActivateAccountFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { mutate: activateAccount, isPending } = useActivateAccount(token);

    const form = useForm<ActivateAccountSchema>({
        resolver: zodResolver(activateAccountSchema),
        defaultValues: { password: '', confirmPassword: '' },
    });

    const onSubmit = (data: ActivateAccountSchema) => {
        activateAccount({ password: data.password });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Digite sua senha"
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
                            <FormLabel>Confirmar Senha</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirme sua senha"
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
                    {isPending ? 'Ativando...' : 'Ativar conta'}
                </Button>
            </form>
        </Form>
    );
};
