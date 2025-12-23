# README em diferentes idiomas

-   [Brazilian Portuguese](README.md)

# Simple Kanban Workflow

A full-stack Kanban task manager designed to provide a smooth user experience using Drag and Drop operations.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Link.png" alt="Link" width="25" height="25" /> Live Demo

-   **Application (Front-end):** [https://simple-kanban-workflow-frontend.vercel.app](https://simple-kanban-workflow-frontend.vercel.app)
-   **API Gateway (Back-end):** [https://simple-kanban-workflow-api.vercel.app](https://simple-kanban-workflow-api.vercel.app)

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png" alt="Hammer and Wrench" width="25" height="25" /> Tech Stack

**Front-end:**

-   React with TypeScript (Vite and CSS3)
-   [dnd-kit](https://dndkit.com/) (Drag and drop logic)

**Back-end:**

-   Node.js with Express
-   TypeScript
-   Vercel Serverless Functions
-   In-Memory Storage (Runtime persistency for demo purposes)

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Memo.webp" alt="Memo" width="25" height="25" /> API Documentation

The API is available at the prefix: `https://simple-kanban-workflow-api.vercel.app/api/v1`

| Method     | Endpoint     | Description                                                     |
| :--------- | :----------- | :-------------------------------------------------------------- |
| **GET**    | `/tasks`     | Retrieves all registered tasks.                                 |
| **GET**    | `/tasks/:id` | Retrieves details of a specific task by ID.                     |
| **POST**   | `/tasks`     | Creates a new task. Requires `title` and `description` in JSON. |
| **PUT**    | `/tasks/:id` | Updates task status or content (essential for Kanban movement). |
| **DELETE** | `/tasks/:id` | Permanently removes a task.                                     |

## ✨ Features

-   **Drag and Drop:** Move tasks seamlessly between "To Do", "In Progress", "Blocked", and "Done" columns.
-   **Serverless Architecture:** Back-end optimized for Vercel Functions environment.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/House.png" alt="House" width="25" height="25" /> Running Locally

```bash
# Clone the repository
git clone [https://github.com/luscaBr2/simple-kanban-workflow.git](https://github.com/luscaBr2/simple-kanban-workflow.git)

# In the /api folder terminal
npm install && npm run dev

# In the /frontend folder terminal
npm install && npm run dev
```
