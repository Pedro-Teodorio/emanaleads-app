# Plano de Execução da Tarefa: Bootstrap de Aplicação Next.js Escalável

## 1.1. Análise da Arquitetura

- [x] A nova aplicação será criada do zero, seguindo estritamente a arquitetura definida em `NEXTJS-ARQUITETURA-ESCALAVEL.md`.
- [x] Todos os módulos, pastas e arquivos serão criados conforme a estrutura proposta no documento.
- [x] O plano está em total conformidade com as regras do `AI-INSTRUCTIONS.md` e do documento de arquitetura.

## 1.2. Análise do Design System

- [ ] O Design System será baseado no **Shadcn-ui**.
- [ ] Os componentes de UI primitivos (`Button`, `Card`, `Input`, etc.) serão adicionados via CLI do Shadcn-ui.
- [ ] Componentes `common` e `features` serão criados conforme a necessidade.

## 1.3. Análise dos Componentes

- [ ] Nenhum componente existente será modificado, pois o projeto é novo.
- [ ] Novos componentes serão criados como parte da feature de `auth`.

## 1.4. Análise das Regras de Negócio

- [ ] A lógica de autenticação será implementada como a primeira feature.
- [ ] A lógica residirá em hooks (`useLogin`), validadores (`zod`), e stores (`zustand`).

## 1.5. Definição de Componentes a Serem Criados/Modificados

- [ ] `features/auth/components/LoginForm.tsx` - (Formulário de login com validação e submissão)
- [ ] `components/ui/button.tsx` - (Adicionado via Shadcn-ui)
- [ ] `components/ui/input.tsx` - (Adicionado via Shadcn-ui)
- [ ] `components/ui/card.tsx` - (Adicionado via Shadcn-ui)
- [ ] `components/ui/form.tsx` - (Adicionado via Shadcn-ui)

## 1.6. Definição da Estrutura de Tela e Navegação

- [ ] A rota `/login` será criada dentro do grupo de rotas `(auth)`.
- [ ] A rota `/dashboard` será criada dentro do grupo de rotas `(main)`.
- [ ] Um layout raiz e layouts para os grupos `(auth)` e `(main)` serão criados.

## 1.7. Plano de Implementação das Regras de Negócio

1.  [x] **Setup Inicial:**
    - [x] Inicializar projeto Next.js com `pnpm create next-app`.
    - [ ] Instalar todas as dependências listadas no documento (`axios`, `@tanstack/react-query`, `zod`, `react-hook-form`, `zustand`, `jest`, `@testing-library/react`).
    - [ ] Criar a estrutura de pastas base (`app`, `components`, `features`, `lib`, `store`, etc.).
2.  [ ] **Configuração do Shadcn-ui:**
    - [ ] Inicializar o `shadcn-ui` com `pnpm dlx shadcn-ui@latest init`.
    - [ ] Adicionar os componentes `button`, `input`, `card`, e `form`.
3.  [ ] **Implementação da Feature `auth`:**
    - [ ] Criar o validador `features/auth/lib/validators.ts` usando Zod.
    - [ ] Configurar a instância do Axios em `lib/api.ts`.
    - [ ] Criar o hook `features/auth/api/useLogin.ts` com React Query.
    - [ ] Criar o store `store/auth.store.ts` com Zustand.
    - [ ] Criar o componente `features/auth/components/LoginForm.tsx`.
4.  [ ] **Criação das Rotas e Páginas:**
    - [ ] Criar a página `app/(auth)/login/page.tsx` e importar o `LoginForm`.
    - [ ] Criar a página `app/(main)/dashboard/page.tsx`.
5.  [ ] **Configuração de Testes:**
    - [ ] Configurar Jest (`jest.config.js`, `jest.setup.js`).
    - [ ] Criar o teste `features/auth/components/LoginForm.test.tsx`.

## 1.8. Plano de Validação da Tarefa

- [ ] Verificar se a aplicação inicia sem erros.
- [ ] Acessar a página `/login` e ver o formulário.
- [ ] Tentar submeter o formulário com dados inválidos e verificar as mensagens de erro.
- [ ] Executar os testes com `pnpm test` e garantir que passem.

## 1.9. Critérios de Sucesso para a Tarefa

- [ ] A estrutura de pastas e arquivos do projeto corresponde exatamente à definida no `NEXTJS-ARQUITETURA-ESCALAVEL.md`.
- [ ] A aplicação é inicializada, a página de login é renderizada e a validação do formulário funciona.
- [ ] Os testes unitários para o `LoginForm` são executados com sucesso.
