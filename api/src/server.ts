// src/server.ts

import express, { Express } from "express";
import cors from "cors"; // <-- 1. Importar o CORS
import TaskController from "./controllers/TaskController";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// --- Configuração do CORS ---
// Permite requisições do seu Front-end (http://localhost:5173)
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions)); // <-- 2. Usar o CORS

app.use(express.json());

// --- Rotas da API RESTful ---

app.get("/api/v1/tasks", TaskController.getAllTasks);
app.get("/api/v1/tasks/:id", TaskController.getTaskById);
app.post("/api/v1/tasks", TaskController.createTask);
app.put("/api/v1/tasks/:id", TaskController.updateTask);
app.delete("/api/v1/tasks/:id", TaskController.deleteTask);

// --- Inicialização do Servidor ---

app.listen(PORT, () => {
    console.log(`[Server] Server is running on port ${PORT}`);
    console.log(`[API] URL: http://localhost:${PORT}/api/v1/tasks`);
});

export default app;
