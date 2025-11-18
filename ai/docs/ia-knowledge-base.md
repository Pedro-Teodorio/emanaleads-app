# Base de Conhecimento da IA - Emanaleads App

## 1. Visão Geral do Projeto

O **Emanaleads App** é uma aplicação web moderna para gerenciamento de leads, construída com Next.js, React, e TypeScript. A aplicação consome uma API externa para persistência de dados e gerenciamento de estado.

## 2. Arquitetura e Tecnologias

- **Framework Principal:** Next.js 16.0.0
- **Biblioteca de UI:** React 19.2.0
- **Linguagem:** TypeScript
- **Estilização:** TailwindCSS
- **Validação de Dados:** Zod
- **Gerenciamento de Estado Assíncrono:** React Query
- **Gerenciamento de Estado Global:** Zustand
- **Requisições HTTP:** Axios

A arquitetura é baseada em features, com uma separação clara de responsabilidades. A aplicação não possui um banco de dados próprio, consumindo dados de uma API externa através do `axios`.

## 3. Estrutura de Pastas e Arquivos

### `src/app`

Esta pasta contém a estrutura de roteamento e os layouts da aplicação, seguindo o padrão do App Router do Next.js.

- **`layout.tsx`**: Layout principal da aplicação.
- **`globals.css`**: Estilos globais.
- **`page.tsx`**: Página inicial da aplicação.

#### `src/app/(auth)`

Grupo de rotas para autenticação.

- **`layout.tsx`**: Layout para as páginas de autenticação.
- **`login/page.tsx`**: Página de login.

#### `src/app/(main)`

Grupo de rotas para a área principal da aplicação, protegida por autenticação.

- **`layout.tsx`**: Layout para a área principal, geralmente incluindo o `AppSidebar`.
- **`dashboard/page.tsx`**: Página do dashboard.
- **`projects/page.tsx`**: Página de listagem de projetos.
- **`users/page.tsx`**: Página de listagem de usuários.

### `src/components`

Componentes de UI reutilizáveis.

#### `src/components/common`

Componentes comuns da aplicação.

- **`AppHeader.tsx`**: Cabeçalho da aplicação.
- **`AppPagination.tsx`**: Componente de paginação.
- **`AppSidebar.tsx`**: Barra lateral da aplicação.
- **`Page.tsx`**: Componente de layout de página.

#### `src/components/ui`

Componentes de UI genéricos, provavelmente do `shadcn/ui`.

- **`button.tsx`**: Componente de botão.
- **`card.tsx`**: Componente de card.
- **`dialog.tsx`**: Componente de diálogo.
- **`form.tsx`**: Componentes para formulários.
- **`input.tsx`**: Componente de input.
- **`label.tsx`**: Componente de label.
- **`pagination.tsx`**: Componente de paginação.
- **`select.tsx`**: Componente de select.
- **`separator.tsx`**: Componente de separador.
- **`sheet.tsx`**: Componente de sheet.
- **`sidebar.tsx`**: Componente de sidebar.
- **`skeleton.tsx`**: Componente de skeleton.
- **`sonner.tsx`**: Componente para notificações.
- **`spinner.tsx`**: Componente de spinner.
- **`textarea.tsx`**: Componente de textarea.
- **`tooltip.tsx`**: Componente de tooltip.

### `src/features`

Contém a lógica de negócio da aplicação, separada por feature.

#### `src/features/auth`

Feature de autenticação.

- **`components/AuthProvider.tsx`**: Provedor de autenticação.
- **`components/GuestRoute.tsx`**: Componente para rotas de convidados.
- **`components/LoginForm.tsx`**: Formulário de login.
- **`components/ProtectedRoute.tsx`**: Componente para rotas protegidas.
- **`hooks/useCheckAuth.ts`**: Hook para verificar a autenticação.
- **`hooks/useLogin.ts`**: Hook para realizar o login.
- **`hooks/useLogout.ts`**: Hook para realizar o logout.
- **`schemas/loginSchema.ts`**: Schema de validação do formulário de login com Zod.
- **`services/login.ts`**: Serviço para realizar a requisição de login.
- **`services/user.ts`**: Serviço para obter informações do usuário.
- **`types/login.ts`**: Tipos relacionados ao login.
- **`types/user.ts`**: Tipos relacionados ao usuário.

#### `src/features/dashboard`

Feature do dashboard.

- **`components/RecentProjects.tsx`**: Componente para exibir projetos recentes.
- **`components/StatsCard.tsx`**: Componente de card de estatísticas.
- **`components/TeamOverview.tsx`**: Componente para visão geral do time.

#### `src/features/projects`

Feature de projetos.

- **`components/ProjectDeleteDialog.tsx`**: Diálogo para deletar um projeto.
- **`components/ProjectFormDialog.tsx`**: Diálogo para criar/editar um projeto.
- **`components/ProjectGrid.tsx`**: Grid para listar os projetos.
- **`constants/project.ts`**: Constantes relacionadas a projetos.
- **`schemas/projects.ts`**: Schema de validação para projetos.
- **`services/mutation.ts`**: Mutações (create, update, delete) de projetos.
- **`services/projects.ts`**: Serviço para buscar projetos.
- **`services/queries.ts`**: Queries (get) de projetos.
- **`types/projects.ts`**: Tipos relacionados a projetos.

#### `src/features/users`

Feature de usuários.

- **`components/UserDeleteDialog.tsx`**: Diálogo para deletar um usuário.
- **`components/UserFormDialog.tsx`**: Diálogo para criar/editar um usuário.
- **`components/UserGrid.tsx`**: Grid para listar os usuários.
- **`constants/users.ts`**: Constantes relacionadas a usuários.
- **`schemas/user.ts`**: Schema de validação para usuários.
- **`services/mutations.ts`**: Mutações (create, update, delete) de usuários.
- **`services/queries.ts`**: Queries (get) de usuários.
- **`services/users.ts`**: Serviço para buscar usuários.
- **`types/user.ts`**: Tipos relacionados a usuários.

### `src/hooks`

Hooks reutilizáveis em toda a aplicação.

- **`use-mobile.ts`**: Hook para detectar se o dispositivo é mobile.

### `src/lib`

Bibliotecas e utilitários.

- **`api.ts`**: Instância do Axios para as requisições HTTP.
- **`providers.tsx`**: Provedores globais da aplicação (React Query, etc.).
- **`utils.ts`**: Funções utilitárias.

### `src/store`

Gerenciamento de estado global com Zustand.

- **`auth.store.ts`**: Store para o estado de autenticação.

### `src/types`

Tipos globais da aplicação.

- **`env.ts`**: Tipos para as variáveis de ambiente.
