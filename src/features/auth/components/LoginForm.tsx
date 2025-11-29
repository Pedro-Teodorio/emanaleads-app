'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '../schemas/loginSchema';
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
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginSchema) => login(data);

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
                <Input placeholder="Digite seu e-mail" className='h-11'{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Senha</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-700 hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <FormControl>
                <div className='relative'>
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Digite sua senha" className='h-11' {...field} />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={isPending} className="w-full bg-blue-700 hover:bg-blue-800 h-11">
          {isPending ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </Form>
  );
};
