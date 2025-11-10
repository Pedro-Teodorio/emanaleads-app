# Plano de Execução da Tarefa: Implementar Paginação de Usuários

## 1.1. Análise da Arquitetura

- [x] A nova funcionalidade de paginação será implementada na feature de `users`.
- [x] Arquivos impactados:
    - `src/features/users/services/users.ts`: Para atualizar a busca de dados.
    - `src/features/users/types/user.ts`: Para adicionar os tipos da resposta paginada.
    - `src/features/users/components/UserGrid.tsx`: Mantido como componente de exibição.
    - `src/app/(main)/users/page.tsx`: Para passar os parâmetros de busca (query params da URL) e orquestrar a paginação.
    - `src/components/common/Pagination.tsx`: Componente de paginação existente utilizado.
- [x] A implementação seguirá os padrões existentes de separação de responsabilidades (service para API, components para UI, page para orquestração).

## 1.2. Análise do Design System

- [x] Utilizar os componentes `Button`, `Table` e `Select` de `shadcn/ui` que já estão no projeto.
- [x] Foi utilizado o componente `src/components/common/Pagination.tsx` existente para a interface de paginação.

## 1.3. Análise dos Componentes

- [x] **Modificar:** `src/features/users/components/UserGrid.tsx`. Este componente continua responsável por renderizar a tabela, recebendo os dados já paginados.
- [x] **Modificar:** `src/app/(main)/users/page.tsx`. A página lê os query params da URL (`page`, `limit`, `search`) e passa-os para a busca de dados, além de renderizar o `UserGrid` e o componente `Pagination`.
- [x] **Utilizar:** O componente `src/components/common/Pagination.tsx` existente.

## 1.4. Análise das Regras de Negócio

- [x] A lógica de busca de dados foi atualizada para incluir os parâmetros `page` e `limit`.
- [x] O estado da paginação (página atual, total de páginas, itens por página) é gerenciado pela `UsersPage` e refletido na URL.
- [x] A URL é a fonte da verdade para o estado da paginação, usando query params (`?page=1&limit=10`).
- [x] Os botões de navegação ("Anterior", "Próxima") são habilitados/desabilitados com base na página atual e no total de páginas, conforme a implementação do componente `Pagination`.

## 1.5. Definição de Componentes a Serem Criados/Modificados

- [x] `src/features/users/types/user.ts`: (Modificar) Adicionado tipos `UserAPIResponse` e `PaginationMeta` para mapear a resposta da API.
- [x] `src/features/users/services/users.ts`: (Modificar) Alterada a função `fetchUserList` para aceitar `page`, `limit` e `search` e retornar a resposta paginada.
- [x] `src/features/users/services/queries.ts`: (Modificar) Atualizada a query para usar os novos parâmetros.
- [x] `src/app/(main)/users/page.tsx`: (Modificar) Refatorado para gerenciar o estado da paginação e busca via URL, e para renderizar o `UserGrid` e o componente `Pagination`.

## 1.6. Definição da Estrutura de Tela e Navegação

- [x] A rota `/users` continua a mesma.
- [x] O estado da paginação é refletido na URL através de query strings, ex: `/users?page=2&limit=10&search=John`.

## 1.7. Plano de Implementação das Regras de Negócio

1.  [x] **Tipagem:** Definidos os tipos para a resposta da API (`UserAPIResponse`, `PaginationMeta`) em `src/features/users/types/user.ts`.
2.  [x] **Serviço:** Atualizado `fetchUserList` em `src/features/users/services/users.ts` para aceitar `{ page, limit, search }` e construir a URL com query params.
3.  [x] **Componente de Página:** Simplificado `app/(main)/users/page.tsx` para apenas renderizar o `UserGrid` e o componente `Pagination`, passando os `searchParams` e gerenciando a navegação.
4.  [x] **Componente da Tabela (`UserGrid.tsx`):** A lógica de busca e paginação foi centralizada na `UsersPage`, e o `UserGrid` atua como componente de exibição. O componente `src/components/common/Pagination.tsx` foi integrado.
5.  [x] **Validação:** Testar a navegação entre páginas, a mudança de limite de itens e a busca, garantindo que a URL e os dados exibidos estejam sempre sincronizados.

## 1.8. Plano de Validação da Tarefa

- [x] A tabela de usuários carrega a primeira página por padrão.
- [x] A URL reflete a página e o limite atuais (ex: `/users?page=1&limit=10`).
- [x] Clicar em "Próxima" atualiza a URL para `?page=2` e carrega os novos dados.
- [x] Clicar em "Anterior" na página 2 atualiza a URL para `?page=1` e carrega os dados da primeira página.
- [x] O botão "Anterior" está desabilitado na página 1.
- [x] O botão "Próxima" está desabilitado na última página.
- [x] A busca de usuário funciona em conjunto com a paginação.

## 1.9. Critérios de Sucesso para a Tarefa

- [x] O usuário pode navegar por todas as páginas da lista de usuários. A interface de paginação é clara, funcional e sincronizada com a URL, permitindo uma experiência de usuário fluida e o compartilhamento de links para páginas específicas da lista.