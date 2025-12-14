// Atualizado para Serverless

import express, { Express } from "express";
import cors from "cors";
import serverless from "serverless-http";
import TaskController from "./controllers/TaskController";

// A porta é ignorada em ambientes serverless
// const PORT = process.env.PORT || 3000;

const app: Express = express();

// Configuração do CORS: Agora aceita qualquer origem em produção para não dar problemas com o Front-end do Vercel
const corsOptions = {
    // Em produção, o Vercel gerencia a origem
    origin:
        process.env.NODE_ENV === "production" ? "*" : "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());

// --- Rotas da API RESTful ---
app.get("/api/v1/tasks", TaskController.getAllTasks);
app.get("/api/v1/tasks/:id", TaskController.getTaskById);
app.post("/api/v1/tasks", TaskController.createTask);
app.put("/api/v1/tasks/:id", TaskController.updateTask);
app.delete("/api/v1/tasks/:id", TaskController.deleteTask);

// Exportamos o handler do serverless-http
export default serverless(app);
