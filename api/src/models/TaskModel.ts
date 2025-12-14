// api/models/TaskModel.ts

import fs from "fs";
import path from "path";
import { Task } from "../interfaces/Task";

// CORREÇÃO FINAL BASEADA NA LOCALIZAÇÃO EXATA:
// TaskModel.ts (models/) -> Sobe para src/ (..) -> Entra em data/ -> tasks.json
const TASKS_FILE_PATH = path.join(__dirname, "..", "data", "tasks.json");

console.log("DEBUG: Caminho de leitura corrigido:", TASKS_FILE_PATH);

/**
 * Lê todas as tarefas do arquivo tasks.json de forma síncrona.
 * @returns {Task[]} Um array de tarefas. Retorna um array vazio se o arquivo não existir ou houver erro.
 */
export const readTasks = (): Task[] => {
    try {
        // Tenta ler o arquivo no caminho corrigido
        const data = fs.readFileSync(TASKS_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        if (e instanceof Error) {
            // Verifica se o erro é 'ENOENT' (Arquivo Não Encontrado)
            if ("code" in e && e.code === "ENOENT") {
                console.log(
                    "tasks.json não encontrado no caminho corrigido. Iniciando com array vazio."
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
 * Escreve o array de tarefas de volta no arquivo tasks.json de forma síncrona.
 */
export const writeTasks = (tasks: Task[]): void => {
    try {
        const data = JSON.stringify(tasks, null, 2);
        // Usa o caminho corrigido
        fs.writeFileSync(TASKS_FILE_PATH, data, "utf-8");
    } catch (e) {
        if (e instanceof Error) {
            console.error("Erro ao escrever tasks.json:", e.message);
        } else {
            console.error("Erro desconhecido ao escrever tasks.json:", e);
        }
    }
};
