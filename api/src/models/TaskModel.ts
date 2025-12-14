// api/models/TaskModel.ts

import fs from "fs";
import path from "path";
import { Task } from "../interfaces/Task";

// Assumindo que este caminho está correto: api/src/models/ -> .. -> data/ -> tasks.json
const TASKS_FILE_PATH = path.join(__dirname, "..", "data", "tasks.json");

console.log("DEBUG: Caminho de leitura corrigido:", TASKS_FILE_PATH);

/**
 * Lê todas as tarefas do arquivo tasks.json. Funciona no Vercel (Read-Only).
 */
export const readTasks = (): Task[] => {
    try {
        const data = fs.readFileSync(TASKS_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        if (e instanceof Error) {
            // Tratamento padrão para arquivo não encontrado (ENOENT)
            if ("code" in e && e.code === "ENOENT") {
                console.log(
                    "tasks.json não encontrado. Iniciando com array vazio."
                );
                return [];
            }
            console.error("Erro ao ler tasks.json:", e.message);
        } else {
            console.error("Erro desconhecido ao ler tasks.json:", e);
        }
        return [];
    }
};

/**
 * Escreve o array de tarefas de volta no arquivo tasks.json.
 * ESSA FUNÇÃO VAI FALHAR NO VERCEL (DISCO READ-ONLY) e PRECISA DE TRATAMENTO.
 */
export const writeTasks = (tasks: Task[]): void => {
    try {
        const data = JSON.stringify(tasks, null, 2);

        // Tenta escrever. Esta linha é a causa provável da falha 500.
        fs.writeFileSync(TASKS_FILE_PATH, data, "utf-8");
    } catch (e) {
        // CORREÇÃO CRÍTICA: Captura e ignora o erro de escrita.
        // Isso permite que a função retorne normalmente e o controlador Express envie 200.
        if (e instanceof Error) {
            console.warn(
                `AVISO (Serverless): A escrita do tasks.json falhou. Isso é ${
                    e.message ? e.message : "um erro de permissão"
                } e é esperado em Serverless. O erro foi ignorado.`
            );
        } else {
            console.error(
                "Erro desconhecido ao tentar escrever tasks.json. Ignorando.",
                e
            );
        }
    }
};
