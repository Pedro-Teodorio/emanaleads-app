import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface ResetPasswordPageProps {
    params: Promise<{
        token: string;
    }>;
}

export default async function ResetPasswordPage({ params }: Readonly<ResetPasswordPageProps>) {
    const { token } = await params;
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 gap-4 p-2">
            <div className='flex flex-col items-center'>
                <div className='size-16 bg-blue-700 rounded-xl flex items-center justify-center mb-4'>
                    <Zap className='text-white size-8' />
                </div>
                <h1 className="text-3xl font-semibold text-center mb-2">Emanaleads</h1>
                <p className="text-center text-lg text-muted-foreground">Redefinir Senha</p>
            </div>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Nova senha</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Defina uma nova senha para sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ResetPasswordForm token={token} />
                </CardContent>
            </Card>
        </div>
    );
}
