import express, { Express, Request, Response } from "express";
import cors from "cors";
import TaskController from "./controllers/TaskController";

const app: Express = express();

const corsOptions = {
    origin:
        process.env.NODE_ENV === "production" ? "*" : "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());

// --- Rota de Teste ---
// Se esta rota responder, a API está 100% funcional.
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

// EXPORTAÇÃO NATIVA:
// O Vercel agora processa o app diretamente sem o wrapper serverless-http.
export default app;
