# Plano de Execução da Tarefa: Implementar Filtro de Status na Página de Projetos

## 1.1. Análise da Arquitetura

- [x] A nova funcionalidade se encaixa perfeitamente na arquitetura existente. O filtro será um novo estado gerenciado pelo componente da página, que será passado para a camada de `queries` do TanStack Query, que por sua vez o passará para a camada de `service` para a chamada de API.
- [x] Os arquivos impactados serão:
    - `src/features/projects/services/queries.ts`
    - `src/features/projects/services/project.service.ts`
    - `src/app/(main)/projects/page.tsx`
    - `src/features/projects/constants/project.constants.ts` (para consumir as constantes)
- [x] A implementação seguirá os padrões de componentização, gerenciamento de estado e chamadas de API já estabelecidos no projeto.

## 1.2. Análise do Design System

- [x] O componente `Select` de `shadcn/ui` será utilizado para o filtro de status.
- [x] Os componentes `Button` e `Input` já existentes serão mantidos para a busca.
- [x] O layout será ajustado para acomodar o novo componente de filtro ao lado da barra de busca.

## 1.3. Análise dos Componentes

- [x] Componente a ser modificado: `src/app/(main)/projects/page.tsx`.
- [ ] Nenhum novo componente de UI precisa ser criado, apenas o uso do `Select` de `shadcn/ui`.

## 1.4. Análise das Regras de Negócio

- [x] A lógica será implementada no componente `projects/page.tsx`.
- [x] Um novo estado (`statusFilter`) será criado para armazenar o valor do filtro de status.
- [x] A alteração do `Select` atualizará este estado e também os parâmetros da URL (`useSearchParams`).
- [x] A `queryKey` do `useQuery` será atualizada para incluir o `statusFilter`, fazendo com que o TanStack Query refaça a busca automaticamente.

## 1.5. Definição de Componentes a Serem Criados/Modificados

- [ ] `projects/page.tsx`: Adicionar o componente `<Select>` para o filtro de status, gerenciar seu estado e integrá-lo com a lógica de busca de dados e atualização da URL.
- [ ] `queries.ts`: Modificar a função `list` para aceitar o parâmetro `status`.
- [ ] `project.service.ts`: Modificar a função de listagem para incluir o `status` nos parâmetros da requisição.

## 1.6. Definição da Estrutura de Tela e Navegação

- [x] A tela existente em `/projects` será modificada.
- [x] Um novo query param `status` será adicionado à URL para refletir o estado do filtro. Ex: `/projects?page=1&status=ACTIVE`.

## 1.7. Plano de Implementação das Regras de Negócio

1.  **Atualizar `queries.ts`**: Modificar a query `list` para aceitar `status` e incluí-lo na `queryKey` e na chamada da `queryFn`.
2.  **Atualizar `project.service.ts`**: Modificar a função `getProjects` (ou similar) para aceitar `status` e adicioná-lo aos `params` da requisição Axios.
3.  **Atualizar `projects/page.tsx`**:
    1.  Ler o parâmetro `status` da URL usando `useSearchParams`.
    2.  Adicionar um estado local para o filtro de status, inicializado com o valor da URL.
    3.  Adicionar o componente `<Select>` ao JSX, populado com os valores de `PROJECT_STATUSES`.
    4.  Criar uma função `handleStatusChange` que atualiza a URL com o novo status e reseta a página para 1.
    5.  Passar o `status` lido da URL para a chamada `useQuery(projectsQueries.list(...))`.
    6.  Adicionar um botão "Limpar Filtros" que remove os parâmetros `search` e `status` da URL.

## 1.8. Plano de Validação da Tarefa

- [ ] Verificar se o componente `<Select>` é renderizado corretamente com todos os status.
- [ ] Verificar se a seleção de um status atualiza a URL com o parâmetro `status`.
- [ ] Verificar se a grade de projetos é atualizada para mostrar apenas os projetos com o status selecionado.
- [ ] Verificar se o filtro de status funciona em conjunto com o filtro de busca por nome.
- [ ] Verificar se o botão "Limpar" ou "Limpar Filtros" remove o parâmetro `status` da URL e exibe todos os projetos novamente.
- [ ] Verificar se a paginação funciona corretamente com o filtro de status ativo.

## 1.9. Critérios de Sucesso para a Tarefa

- [ ] O usuário consegue filtrar a lista de projetos por status usando um controle de `<Select>`.
- [ ] O estado do filtro é persistido na URL através de query params.
- [ ] A funcionalidade de busca e paginação continua operando corretamente em conjunto com o novo filtro.
