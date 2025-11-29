'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema, forgotPasswordSchema } from '../schemas/forgotPasswordSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForgotPassword } from '../hooks/useForgotPassword';

export const ForgotPasswordForm = () => {
    const { mutate: sendResetEmail, isPending } = useForgotPassword();

    const form = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: '' },
    });

    const onSubmit = (data: ForgotPasswordSchema) => sendResetEmail(data);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Digite seu email cadastrado"
                                    className='h-11'
                                    {...field}
                                />
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
                    {isPending ? 'Enviando...' : 'Enviar instruções'}
                </Button>
            </form>
        </Form>
    );
};
