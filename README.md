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
│   └── utils.ts
└── store/
    └── auth.store.ts
```

---

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Contato

-   **Autor**: Pedro Teodorio
-   **GitHub**: [Pedro-Teodorio](https://github.com/Pedro-Teodorio)
