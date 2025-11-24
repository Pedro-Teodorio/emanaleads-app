import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 gap-4 p-2">
            <div className='flex flex-col items-center'>
                <div className='size-16 bg-blue-700 rounded-xl flex items-center justify-center mb-4'>
                    <Zap className='text-white size-8' />
                </div>
                <h1 className="text-3xl font-semibold text-center mb-2">Emanaleads</h1>
                <p className="text-center text-lg text-muted-foreground">Recuperação de Senha</p>
            </div>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Esqueci minha senha</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Digite seu email para receber instruções de recuperação
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ForgotPasswordForm />
                    <div className="text-center">
                        <Link href="/login" className="text-sm text-blue-700 hover:underline">
                            Voltar para o login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
