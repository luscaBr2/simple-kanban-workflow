import express, { Express, Request, Response } from "express"; // Adicione Request e Response para o tipo da rota de teste
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

// --- Rota de Teste ---
// Se esta rota responder em https://[Seu-Dominio].vercel.app/, o problema é o roteamento.
app.get("/", (req: Request, res: Response) => {
    // Retorna uma mensagem de sucesso
    res.json({
        status: "API Gateway está Online",
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

// Exportamos o handler do serverless-http
export default serverless(app);
