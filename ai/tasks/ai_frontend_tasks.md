# Plano de Execução da Tarefa: Implementar Paginação de Projetos

## 1.1. Análise da Arquitetura

- [x] A nova funcionalidade de paginação será implementada na feature de `projects`, seguindo o padrão já estabelecido na feature `users`.
- [x] Arquivos impactados:
    - `src/features/projects/services/projects.ts`: Para atualizar a busca de dados.
    - `src/features/projects/types/projects.ts`: Para adicionar os tipos da resposta paginada.
    - `src/features/projects/services/queries.ts`: Para atualizar a query do React Query.
    - `src/app/(main)/projects/page.tsx`: Para orquestrar a paginação e a busca.
    - `src/components/common/Pagination.tsx`: Será utilizado para a UI de paginação.
- [x] A implementação manterá a separação de responsabilidades existente.

## 1.2. Análise do Design System

- [x] Utilizar o componente `Pagination` existente em `src/components/common/Pagination.tsx`.
- [x] Utilizar os componentes `Button`, `Input`, etc., do `shadcn/ui` que já estão em uso.

## 1.3. Análise dos Componentes

- [x] **Modificar:** `src/app/(main)/projects/page.tsx`. Este componente será o orquestrador da lógica de paginação, lendo e escrevendo na URL e passando os dados para os componentes filhos.
- [x] **Modificar:** `src/features/projects/components/ProjectGrid.tsx`. Apenas para garantir que continue recebendo a lista de projetos corretamente. Nenhuma mudança de lógica é esperada aqui.

## 1.4. Análise das Regras de Negócio

- [x] A lógica de busca de dados foi atualizada para incluir os parâmetros `page`, `limit` e `search`.
- [x] A URL será a fonte da verdade para o estado da paginação (`?page=1&limit=10&search=...`).
- [x] A `UsersPage` será responsável por ler os `searchParams`, acionar a busca de dados com `useQuery`, e fornecer os handlers para navegação de página e busca, que por sua vez atualizam a URL.

## 1.5. Definição de Componentes a Serem Criados/Modificados

- [x] `src/features/projects/types/projects.ts`: (Modificar) Adicionar tipos `ProjectAPIResponse` e `PaginationMeta`.
- [x] `src/features/projects/services/projects.ts`: (Modificar) Alterar a função `fetchProjectsList` para aceitar `{ page, limit, search }` e retornar a resposta paginada.
- [x] `src/features/projects/services/queries.ts`: (Modificar) Alterar a query `projectsQueries.all` para `projectsQueries.list` e fazê-la aceitar os parâmetros de paginação.
- [x] `src/app/(main)/projects/page.tsx`: (Refatorar) Implementar a lógica de controle da paginação, similar à `UsersPage`.

## 1.6. Definição da Estrutura de Tela e Navegação

- [x] A rota `/projects` continuará a mesma.
- [x] O estado da paginação será refletido na URL através de query strings.

## 1.7. Plano de Implementação das Regras de Negócio

1.  [x] **Tipagem:** Definir os tipos `ProjectAPIResponse` e `PaginationMeta` em `src/features/projects/types/projects.ts`.
2.  [x] **Serviço:** Atualizar `fetchProjectsList` em `src/features/projects/services/projects.ts` para aceitar `{ page, limit, search }`.
3.  [x] **Query:** Atualizar `projectsQueries` em `src/features/projects/services/queries.ts` para passar os parâmetros para a função de fetch e para a `queryKey`.
4.  [x] **Componente de Página:** Refatorar `app/(main)/projects/page.tsx` para:
    - Usar `useSearchParams`, `useRouter` e `usePathname`.
    - Ler `page`, `limit`, e `search` da URL.
    - Chamar `useQuery(projectsQueries.list({ ...params }))`.
    - Implementar handlers para busca e mudança de página que atualizam a URL.
    - Renderizar o `ProjectGrid` com os dados paginados e o componente `Pagination` com os metadados.

## 1.8. Plano de Validação da Tarefa

- [ ] A lista de projetos carrega a primeira página por padrão.
- [ ] A URL reflete a página e o limite atuais (ex: `/projects?page=1&limit=10`).
- [ ] Clicar em "Próxima" no componente de paginação atualiza a URL e carrega os novos dados.
- [ ] A busca por nome de projeto funciona e reseta a paginação para a página 1.
- [ ] Os botões de paginação são desabilitados corretamente na primeira e última página.

## 1.9. Critérios de Sucesso para a Tarefa

- [ ] O usuário pode navegar por todas as páginas da lista de projetos. A interface de paginação é funcional e sincronizada com a URL, permitindo uma experiência de usuário fluida e o compartilhamento de links para páginas específicas da lista.