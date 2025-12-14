// api/models/TaskModel.ts

import fs from "fs";
import path from "path";
import { Task } from "../interfaces/Task";

// O Vercel coloca o arquivo compilado (.js) e os arquivos incluídos
// (tasks.json, via vercel.json) no mesmo diretório na função Serverless.
// Isso é mais confiável do que process.cwd().
const TASKS_FILE_PATH = path.join(__dirname, "tasks.json");

// Você pode remover este log após o sucesso, mas ajuda na depuração:
console.log("DEBUG: Caminho de leitura usando __dirname:", TASKS_FILE_PATH);

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
        // --- Tratamento de Erros e ENOENT ---
        if (e instanceof Error) {
            // Verifica se o erro é 'ENOENT' (Arquivo Não Encontrado).
            if ("code" in e && e.code === "ENOENT") {
                console.log(
                    "tasks.json não encontrado no caminho. Iniciando com array vazio."
                );
                return [];
            }

            console.error("Erro ao ler tasks.json:", e.message);
        } else {
            console.error("Erro desconhecido ao ler tasks.json:", e);
        }

        // Em caso de falha, retorna um array vazio.
        return [];
    }
};

/**
 * Escreve o array de tarefas de volta no arquivo tasks.json de forma síncrona.
 * NOTA: As alterações no disco são perdidas após a execução da função Serverless.
 * @param {Task[]} tasks O array de tarefas a ser escrito.
 */
export const writeTasks = (tasks: Task[]): void => {
    try {
        const data = JSON.stringify(tasks, null, 2);
        // Escreve os dados no caminho corrigido.
        fs.writeFileSync(TASKS_FILE_PATH, data, "utf-8");
    } catch (e) {
        if (e instanceof Error) {
            console.error("Erro ao escrever tasks.json:", e.message);
        } else {
            console.error("Erro desconhecido ao escrever tasks.json:", e);
        }
    }
};
