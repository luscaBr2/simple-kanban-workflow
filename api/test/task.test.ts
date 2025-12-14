import request from "supertest";
import app from "../src/server";
import * as fs from "fs";
import * as path from "path";

// Caminho para o "DB"
const tasksFilePath = path.join(__dirname, "../src/data", "tasks.json");

// Garante que o arquivo tasks.json está vazio antes de cada teste
beforeEach(() => {
    fs.writeFileSync(tasksFilePath, "[]");
});

describe("Task API Endpoints (TypeScript)", () => {
    it("deve criar uma nova tarefa (POST /api/v1/tasks)", async () => {
        const newTask = {
            title: "Configurar Novo Servidor TS",
            description: "Instalar e configurar o Linux e Docker.",
        };

        const response = await request(app).post("/api/v1/tasks").send(newTask);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.title).toBe("Configurar Novo Servidor TS");
        expect(response.body.status).toBe("To Do"); // Testa a regra de workflow
    });

    it("deve retornar 400 se o status for inválido", async () => {
        // 1. Cria a tarefa
        const creationResponse = await request(app)
            .post("/api/v1/tasks")
            .send({ title: "Tarefa de Erro", description: "Descrição" });

        const taskId = creationResponse.body.id;

        // 2. Tenta atualizar com status inválido
        const updateResponse = await request(app)
            .put(`/api/v1/tasks/${taskId}`)
            // TypeScript impede este erro em tempo de compilação, mas testamos a validação de runtime:
            .send({ status: "INVALID_STATUS" });

        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body).toHaveProperty("error");
    });

    it("deve deletar uma tarefa (DELETE /api/v1/tasks/:id)", async () => {
        // 1. Cria a tarefa
        const creationResponse = await request(app)
            .post("/api/v1/tasks")
            .send({ title: "Tarefa para Deletar", description: "Descrição" });

        const taskId = creationResponse.body.id;

        // 2. Deleta a tarefa
        const deleteResponse = await request(app).delete(
            `/api/v1/tasks/${taskId}`
        );

        expect(deleteResponse.statusCode).toBe(204);
    });
});
