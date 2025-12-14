import express, { Express, Request, Response } from "express";
import cors from "cors";
import TaskController from "./controllers/TaskController";

const app: Express = express();

// CORREÇÃO FINAL: Definindo o domínio exato do seu Front-end
const PRODUCTION_FRONTEND_ORIGIN =
    "https://simple-kanban-workflow-frontend.vercel.app";

// Configuração robusta do CORS
const corsOptions = {
    // Lista de origens permitidas:
    origin: [
        PRODUCTION_FRONTEND_ORIGIN,
        // Permite o ambiente local do Front-end (Vite/React padrão)
        "http://localhost:5173",
        // Permite o ambiente local da API (se for 3000)
        "http://localhost:3000",
    ],
    // MÉTODOS CORRIGIDOS: É crucial incluir PUT e DELETE para o Kanban
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    // Garante que a requisição OPTIONS (Preflight) retorne 204 (No Content)
    optionsSuccessStatus: 204,
};

// Aplica o middleware CORS
app.use(cors(corsOptions));

// Middleware para parsing do body JSON
app.use(express.json());

// --- Rota de Teste (Gateway) ---
app.get("/", (req: Request, res: Response) => {
    res.json({
        status: "API Gateway está Online (Native Vercel)",
        environment: process.env.NODE_ENV,
    });
});
// --- FIM Rota de Teste ---

// --- Rotas da API RESTful ---
app.get("/api/v1/tasks", TaskController.getAllTasks);
app.get("/api/v1/tasks/:id", TaskController.getTaskById);
app.post("/api/v1/tasks", TaskController.createTask);
app.put("/api/v1/tasks/:id", TaskController.updateTask);
app.delete("/api/v1/tasks/:id", TaskController.deleteTask);

// EXPORTAÇÃO NATIVA VERCEL
export default app;
