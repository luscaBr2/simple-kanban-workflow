# README in different languages

-   [English](README.en.md)

# Fluxo de trabalho Kanban simples

Um gerenciador de tarefas estilo Kanban simples, desenvolvido para oferecer uma experiência de usuário fluida com operações de arrastar e soltar (Drag and Drop).

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Link.png" alt="Link" width="25" height="25" /> Links de Acesso

-   **Aplicação (Front-end):** [https://simple-kanban-workflow-frontend.vercel.app](https://simple-kanban-workflow-frontend.vercel.app)
-   **API Gateway (Back-end):** [https://simple-kanban-workflow-api.vercel.app](https://simple-kanban-workflow-api.vercel.app)

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png" alt="Hammer and Wrench" width="25" height="25" /> Tecnologias Utilizadas

**Front-end:**

-   React com TypeScript (Vite e CSS3)
-   [dnd-kit](https://dndkit.com/) (Lógica de arrastar e soltar)

**Back-end:**

-   Node.js com Express
-   TypeScript
-   Vercel Serverless Functions
-   Armazenamento em Memória (Runtime persistency para demonstração)

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Memo.webp" alt="Memo" width="25" height="25" /> Documentação da API

A API está disponível no prefixo: `https://simple-kanban-workflow-api.vercel.app/api/v1`

| Método     | Endpoint     | Descrição                                                          |
| :--------- | :----------- | :----------------------------------------------------------------- |
| **GET**    | `/tasks`     | Lista todas as tarefas cadastradas.                                |
| **GET**    | `/tasks/:id` | Retorna os detalhes de uma tarefa específica pelo ID.              |
| **POST**   | `/tasks`     | Cria uma nova tarefa. Enviar `title` e `description` no JSON.      |
| **PUT**    | `/tasks/:id` | Atualiza o status ou conteúdo da tarefa (essencial para o Kanban). |
| **DELETE** | `/tasks/:id` | Remove permanentemente uma tarefa.                                 |

## ✨ Funcionalidades

-   **Drag and Drop:** Movimentação entre as colunas "To Do", "In Progress", "Blocked" e "Done".
-   **Arquitetura Serverless:** Back-end otimizado para rodar em funções Vercel.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/House.png" alt="House" width="25" height="25" /> Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/luscaBr2/simple-kanban-workflow.git

# No terminal da pasta /api
npm install && npm run dev

# No terminal da pasta /frontend
npm install && npm run dev
```
