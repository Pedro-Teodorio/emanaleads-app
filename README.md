# Emanaleads App

![Next.js](https://img.shields.io/badge/Next.js-16.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Descrição

O **Emanaleads App** é uma aplicação moderna desenvolvida com **Next.js** e **React**, utilizando **TypeScript** e **TailwindCSS** para estilização. Este projeto é uma solução para gerenciamento de leads, com autenticação, dashboard e outras funcionalidades essenciais.

---

## Tecnologias Utilizadas

-   **Next.js** 16.0.0
-   **React** 19.2.0
-   **TypeScript**
-   **TailwindCSS**
-   **Zod** para validação de dados
-   **React Query** para gerenciamento de estado assíncrono
-   **Zustand** para gerenciamento de estado global
-   **Axios** para requisições HTTP

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

-   **Node.js** (versão 16 ou superior)
-   **pnpm** (gerenciador de pacotes)

---

## Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto localmente:

1. Clone o repositório:

    ```bash
    git clone https://github.com/Pedro-Teodorio/emanaleads-app.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd emanaleads-app
    ```

3. Instale as dependências:

    ```bash
    pnpm install
    ```

4. Crie um arquivo `.env` baseado no `.env_example`:

    ```bash
    cp .env_example .env
    ```

5. Execute o projeto em modo de desenvolvimento:

    ```bash
    pnpm dev
    ```

6. Acesse a aplicação no navegador:

    ```
    http://localhost:3000
    ```

---

## Scripts Disponíveis

-   `pnpm dev`: Inicia o servidor de desenvolvimento.
-   `pnpm build`: Gera a build de produção.
-   `pnpm start`: Inicia o servidor em modo de produção.
-   `pnpm test`: Executa os testes.
-   `pnpm lint`: Executa o linter para verificar problemas no código.

---

## Estrutura do Projeto

```plaintext
src/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   └── login/
│   │       └── page.tsx
│   ├── (main)/
│   │   ├── layout.tsx
│   │   └── dashboard/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── common/
│   │   └── AppHeader.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── sonner.tsx
│       └── spinner.tsx
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── GuestRoute.tsx
│   │   │   ├── LoginForm.test.tsx
│   │   │   └── LoginForm.tsx
│   │   ├── hooks/
│   │   │   ├── useCheckAuth.ts
│   │   │   ├── useLogin.ts
│   │   │   └── useLogout.ts
│   │   ├── schemas/
│   │   │   └── loginSchema.ts
│   │   ├── services/
│   │   │   ├── login.ts
│   │   │   └── user.ts
│   │   └── types/
│   │       ├── login.ts
│   │       └── user.ts
│   └── ...
├── lib/
│   ├── api.ts
│   ├── providers.tsx
│   ├── rbac.ts
│   └── utils.ts
└── store/
    └── auth.store.ts
```

---

## 🔐 Arquitetura RBAC (Role-Based Access Control)

O sistema implementa controle de acesso baseado em três perfis principais, com permissões estáticas e validações dinâmicas de ownership.

### Perfis do Sistema

| Perfil           | Descrição                                                    | Rota Padrão |
| ---------------- | ------------------------------------------------------------ | ----------- |
| **ROOT**         | Administrador global com acesso completo ao sistema          | `/users`    |
| **ADMIN**        | Administrador de projetos (ownership validado por `adminId`) | `/projects` |
| **PROJECT_USER** | Membro de projetos com acesso limitado a leads atribuídos    | `/leads`    |

### Matriz de Permissões

#### Módulo Users

| Ação            | ROOT | ADMIN | PROJECT_USER |
| --------------- | ---- | ----- | ------------ |
| Listar usuários | ✅   | ❌    | ❌           |
| Criar usuário   | ✅   | ❌    | ❌           |
| Editar usuário  | ✅   | ❌    | ❌           |
| Deletar usuário | ✅   | ❌    | ❌           |

#### Módulo Projects

| Ação                  | ROOT | ADMIN                | PROJECT_USER |
| --------------------- | ---- | -------------------- | ------------ |
| Listar todos projetos | ✅   | ❌ (só adminId=self) | ❌           |
| Criar projeto         | ✅   | ❌                   | ❌           |
| Editar projeto        | ✅   | ✅ (ownership)       | ❌           |
| Deletar projeto       | ✅   | ❌                   | ❌           |
| Gerenciar membros     | ✅   | ✅ (ownership)       | ❌           |

#### Módulo Leads

| Ação                     | ROOT | ADMIN                   | PROJECT_USER                |
| ------------------------ | ---- | ----------------------- | --------------------------- |
| Listar todos leads       | ✅   | ❌ (só projectId=admin) | ❌ (só assignedUserId=self) |
| Criar lead               | ✅   | ✅                      | ✅ (em projetos membro)     |
| Editar lead              | ✅   | ✅ (ownership)          | ✅ (se assigned)            |
| Deletar lead             | ✅   | ✅ (ownership)          | ❌                          |
| Atualizar status do lead | ✅   | ✅ (ownership)          | ✅ (se assigned)            |

### Navegação Condicional

A sidebar renderiza menu baseado no perfil do usuário autenticado:

```typescript
// src/lib/rbac.ts
export const NAV_ITEMS: NavItem[] = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		roles: ['ROOT', 'ADMIN', 'PROJECT_USER'],
		icon: LayoutDashboard,
	},
	{
		label: 'Usuários',
		href: '/users',
		roles: ['ROOT'],
		icon: Users,
	},
	{
		label: 'Projetos',
		href: '/projects',
		roles: ['ROOT', 'ADMIN'],
		icon: FolderKanban,
	},
	{
		label: 'Leads',
		href: '/leads',
		roles: ['ROOT', 'ADMIN', 'PROJECT_USER'],
		icon: SquareKanban,
	},
];
```

**Uso no componente:**

```typescript
// src/components/common/AppSidebar.tsx
import { NAV_ITEMS } from '@/lib/rbac';

const currentUser = useAuthStore((state) => state.user);

const filteredNavItems = NAV_ITEMS.filter((item) => item.roles.includes(currentUser?.role as SystemRole));
```

### Proteção de Rotas

#### RoleGuard

Componente wrapper que valida acesso por perfil:

```typescript
// src/features/auth/components/RoleGuard.tsx
interface RoleGuardProps {
	allowedRoles: SystemRole[];
	children: React.ReactNode;
	redirectTo?: string;
}

export function RoleGuard({ allowedRoles, children, redirectTo }: RoleGuardProps) {
	const { user, status } = useAuthStore();

	if (status === 'loading') return <Spinner />;
	if (status === 'unauthenticated') redirect('/login');
	if (!allowedRoles.includes(user!.role)) redirect(redirectTo || DEFAULT_ROUTES[user!.role]);

	return <>{children}</>;
}
```

**Exemplo de uso:**

```typescript
// src/app/(main)/users/layout.tsx
export default function UsersLayout({ children }: { children: React.ReactNode }) {
	return <RoleGuard allowedRoles={['ROOT']}>{children}</RoleGuard>;
}
```

### Validação de Ownership

Para permissões dinâmicas que dependem de contexto (projeto do usuário, lead atribuído), use o hook `usePermissions`:

```typescript
// src/features/auth/hooks/usePermissions.ts
export function usePermissions() {
	const { user } = useAuthStore();
	const { data: projects } = useProjectsQuery();

	const adminOfProjectIds = projects?.filter((p) => p.adminId === user?.id).map((p) => p.id) || [];

	return {
		role: user?.role,
		userId: user?.id,
		permissions: ROLE_PERMISSIONS[user?.role || 'PROJECT_USER'],

		// Validação dinâmica de ownership
		canEditProject: (context: { project: Project }) => {
			if (user?.role === 'ROOT') return true;
			if (user?.role === 'ADMIN') return context.project.adminId === user.id;
			return false;
		},

		canEditLead: (context: { lead: Lead }) => {
			if (user?.role === 'ROOT') return true;
			if (user?.role === 'ADMIN') {
				return adminOfProjectIds.includes(context.lead.projectId);
			}
			if (user?.role === 'PROJECT_USER') {
				return context.lead.assignedUserId === user.id;
			}
			return false;
		},

		canDeleteLead: (context: { lead: Lead }) => {
			if (user?.role === 'ROOT') return true;
			if (user?.role === 'ADMIN') {
				return adminOfProjectIds.includes(context.lead.projectId);
			}
			return false;
		},
	};
}
```

**Exemplo de uso na UI:**

```typescript
// src/app/(main)/leads/page.tsx
const permissions = usePermissions();

const canEditThisLead = permissions.canEditLead({ lead });
const canDeleteThisLead = permissions.canDeleteLead({ lead });

<Button
	disabled={!canEditThisLead}
	onClick={() => handleEdit(lead)}>
	Editar
</Button>;
```

---

## 📊 Módulo Leads

### Visão Geral

Gerenciamento completo de leads com workflow de status, filtros avançados e permissões por perfil.

**Localização:** `/leads` (acessível por ROOT, ADMIN, PROJECT_USER)

### Funcionalidades

#### Listagem e Filtros

```typescript
// src/app/(main)/leads/page.tsx
const filters = {
	search: '', // Busca por name, email ou phone
	status: '', // PRIMEIRO_CONTATO, REUNIAO, PROPOSTA_ENVIADA, etc
	projectId: '', // ROOT/ADMIN: filtro por projeto
	unassigned: false, // Exibe apenas leads sem assignedUserId
};
```

**Filtros por perfil:**

-   **ROOT**: Vê todos os leads, pode filtrar por qualquer projeto
-   **ADMIN**: Vê apenas leads dos projetos administrados (`projectId IN adminOfProjects`)
-   **PROJECT_USER**: Vê apenas leads atribuídos (`assignedUserId === userId`)

#### Workflow de Status

O sistema implementa transições de status baseadas em matriz de regras de negócio:

```typescript
// src/lib/rbac.ts
export const ALLOWED_STATUS_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
	PRIMEIRO_CONTATO: ['REUNIAO', 'PROPOSTA_ENVIADA'],
	REUNIAO: ['PROPOSTA_ENVIADA'],
	PROPOSTA_ENVIADA: ['ANALISE_PROPOSTA', 'FECHADO_PERDIDO'],
	ANALISE_PROPOSTA: ['FECHADO_GANHO', 'FECHADO_PERDIDO'],
	FECHADO_GANHO: [], // Status final
	FECHADO_PERDIDO: [], // Status final
};
```

**Fluxo visual:**

```
PRIMEIRO_CONTATO
    ├─→ REUNIAO
    │    └─→ PROPOSTA_ENVIADA
    └─→ PROPOSTA_ENVIADA
           ├─→ ANALISE_PROPOSTA
           │    ├─→ FECHADO_GANHO ⚠️ (requer reason)
           │    └─→ FECHADO_PERDIDO ⚠️ (requer reason)
           └─→ FECHADO_PERDIDO ⚠️ (requer reason)
```

**Status finais** (`FECHADO_GANHO`, `FECHADO_PERDIDO`) exigem campo `reason` (mínimo 2 caracteres) explicando o resultado.

#### Componente de Transição de Status

```typescript
// src/features/leads/components/LeadStatusTransitionDialog.tsx
<LeadStatusTransitionDialog
	open={statusDialogOpen}
	onOpenChange={setStatusDialogOpen}
	currentStatus={lead.status}
	onSubmit={(toStatus, reason) => {
		updateLeadStatus({ id: lead.id, toStatus, reason });
	}}
	loading={isUpdating}
/>
```

**Validações:**

-   Dropdown mostra apenas status permitidos via `getNextStatuses(currentStatus)`
-   Campo `reason` aparece automaticamente se `requiresReason(toStatus)`
-   Botão desabilitado se não houver transições disponíveis
-   Permissões validadas via `canUpdateLeadStatus`:
    -   **ROOT**: Sempre pode
    -   **ADMIN**: Se `canEditLead({ lead })` (ownership de projeto)
    -   **PROJECT_USER**: Se `lead.assignedUserId === userId`

#### Formulário de Lead

```typescript
// src/features/leads/schemas/lead.ts
export const leadFormSchema = z
	.object({
		name: z.string().min(1, 'Nome é obrigatório'),
		email: z.union([z.string().email('Email inválido'), z.literal('')]).optional(),
		phone: z.string().optional(),
		projectId: z.string().uuid('Projeto inválido'),
		assignedUserId: z.string().uuid().optional(),
		requestType: z.string().optional(),
		position: z.string().optional(),
	})
	.refine((data) => data.email || data.phone, {
		message: 'Informe pelo menos um contato: email ou telefone',
		path: ['email'],
	});
```

**Regras de validação:**

-   `name`: Obrigatório (mínimo 1 caractere)
-   `email` **OU** `phone`: Pelo menos um deve ser informado
-   `projectId`: Obrigatório, dropdown populado com projetos acessíveis
-   `assignedUserId`: Opcional, dropdown com membros do projeto selecionado
-   `requestType`, `position`: Opcionais

**Tratamento de tipos:**

```typescript
// Lead do backend vem com campos nullable
const defaultValues = {
	name: lead.name,
	email: lead.email ?? '', // null → empty string
	phone: lead.phone ?? '',
	projectId: lead.projectId,
	assignedUserId: lead.assignedUserId ?? '',
	requestType: lead.requestType ?? '',
	position: lead.position ?? '',
};

// No submit, converte empty string → undefined
const handleSubmit = (data: LeadFormData) => {
	const cleanedData = {
		...data,
		email: data.email || undefined,
		phone: data.phone || undefined,
		assignedUserId: data.assignedUserId || undefined,
		requestType: data.requestType || undefined,
		position: data.position || undefined,
	};
	onSubmit(cleanedData);
};
```

### Integração com API

#### Queries

```typescript
// src/features/leads/services/queries.ts
export const leadsQueries = {
	list: (params: LeadListParams) =>
		useQuery({
			queryKey: [LeadQueriesKeys.GET_LEAD_LIST, params],
			queryFn: () => getLeads(params),
			staleTime: 30000,
		}),

	detail: (id: string) =>
		useQuery({
			queryKey: [LeadQueriesKeys.GET_LEAD_DETAIL, id],
			queryFn: () => getLeadById(id),
		}),
};
```

#### Mutations

```typescript
// src/features/leads/services/mutations.ts
export function useCreateLeadMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createLead,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [LeadQueriesKeys.GET_LEAD_LIST] });
			toast.success('Lead criado com sucesso');
		},
	});
}

export function useUpdateLeadStatusMutation({ setStatusDialogOpen }) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, toStatus, reason }: UpdateLeadStatusParams) => updateLeadStatus(id, { toStatus, reason }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [LeadQueriesKeys.GET_LEAD_LIST] });
			toast.success('Status atualizado com sucesso');
			setStatusDialogOpen(false);
		},
	});
}
```

**Cache invalidation:** Todas as mutations invalidam `GET_LEAD_LIST` para sincronizar listagem automaticamente.

### Visualização

O módulo suporta visualização em **grid** (cards responsivos):

```typescript
// src/features/leads/components/LeadGrid.tsx
<LeadGrid
	leads={leads}
	loading={isLoading}
	onEdit={handleEdit}
	onDelete={handleDelete}
	onUpdateStatus={handleUpdateStatus}
	canEdit={(lead) => permissions.canEditLead({ lead })}
	canDelete={(lead) => permissions.canDeleteLead({ lead })}
	canUpdateStatus={(lead) => {
		const nextStatuses = getNextStatuses(lead.status);
		if (nextStatuses.length === 0) return false;
		if (permissions.role === 'ROOT') return true;
		if (permissions.role === 'ADMIN') return permissions.canEditLead({ lead });
		if (permissions.role === 'PROJECT_USER') return lead.assignedUserId === permissions.userId;
		return false;
	}}
/>
```

**Ações por card:**

-   **Status** (ícone GitBranchPlus): Abre dialog de transição se houver próximos status e permissão
-   **Editar** (ícone Pencil): Se `canEdit(lead)`
-   **Deletar** (ícone Trash2): Se `canDelete(lead)`

---

## 🧪 Testes

```bash
pnpm test
```

Executar testes em modo watch:

```bash
pnpm test:watch
```

---

## 📚 Recursos Adicionais

### Backend API

Documentação completa da API disponível em: [emanaleads-api README](../emanaleads-api/README.md)

Endpoints principais:

-   `POST /api/auth/login` - Autenticação
-   `GET /api/users/me` - Perfil do usuário autenticado
-   `GET /api/projects` - Listagem de projetos (com filtros RBAC)
-   `GET /api/leads` - Listagem de leads (com filtros RBAC)
-   `PUT /api/leads/:id/status` - Atualização de status com validação de workflow

### Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Contato

-   **Autor**: Pedro Teodorio
-   **GitHub**: [Pedro-Teodorio](https://github.com/Pedro-Teodorio)
