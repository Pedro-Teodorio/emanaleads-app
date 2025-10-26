import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';

// Mocking a module that uses 'use client'
jest.mock('../api/useLogin', () => ({
  __esModule: true,
  useLogin: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

// Mocking a module that uses next/navigation
jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({ 
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
   }),
}));

const queryClient = new QueryClient();
const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );

describe('LoginForm', () => {
  it('deve renderizar os campos de email e senha', () => {
    renderComponent();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  it('deve mostrar mensagens de erro ao submeter formulário inválido', async () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
      expect(
        screen.getByText(/A senha deve ter no mínimo 8 caracteres/i)
      ).toBeInTheDocument();
    });
  });
});
