"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
        const response = await (0, supertest_1.default)(server_1.default).post("/api/v1/tasks").send(newTask);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.title).toBe("Configurar Novo Servidor TS");
        expect(response.body.status).toBe("To Do"); // Testa a regra de workflow
    });
    it("deve retornar 400 se o status for inválido", async () => {
        // 1. Cria a tarefa
        const creationResponse = await (0, supertest_1.default)(server_1.default)
            .post("/api/v1/tasks")
            .send({ title: "Tarefa de Erro", description: "Descrição" });
        const taskId = creationResponse.body.id;
        // 2. Tenta atualizar com status inválido
        const updateResponse = await (0, supertest_1.default)(server_1.default)
            .put(`/api/v1/tasks/${taskId}`)
            // TypeScript impede este erro em tempo de compilação, mas testamos a validação de runtime:
            .send({ status: "INVALID_STATUS" });
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body).toHaveProperty("error");
    });
    it("deve deletar uma tarefa (DELETE /api/v1/tasks/:id)", async () => {
        // 1. Cria a tarefa
        const creationResponse = await (0, supertest_1.default)(server_1.default)
            .post("/api/v1/tasks")
            .send({ title: "Tarefa para Deletar", description: "Descrição" });
        const taskId = creationResponse.body.id;
        // 2. Deleta a tarefa
        const deleteResponse = await (0, supertest_1.default)(server_1.default).delete(`/api/v1/tasks/${taskId}`);
        expect(deleteResponse.statusCode).toBe(204);
    });
});
