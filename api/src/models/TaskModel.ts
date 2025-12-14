import fs from "fs";
import path from "path";
import { Task } from "../interfaces/Task";

// CORREÇÃO CRUCIAL:
// Usa process.cwd() para obter o diretório raiz da função Serverless,
// garantindo que o Vercel encontre o tasks.json incluído via 'includeFiles'.
const TASKS_FILE_PATH = path.join(process.cwd(), "tasks.json");

/**
 * Lê todas as tarefas do arquivo tasks.json de forma síncrona.
 * @returns {Task[]} Um array de tarefas. Retorna um array vazio se o arquivo não existir ou houver erro.
 */
export const readTasks = (): Task[] => {
    try {
        // Tenta ler o arquivo
        const data = fs.readFileSync(TASKS_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        if (e instanceof Error) {
            // Verifica se o erro é 'ENOENT' (Arquivo Não Encontrado).
            // Se o arquivo não existir, retorna um array vazio (e não trava).
            if ("code" in e && e.code === "ENOENT") {
                console.log(
                    "tasks.json não encontrado. Iniciando com array vazio."
                );
                return [];
            }

            // Loga outros erros de leitura (parsing, etc.)
            console.error("Erro ao ler tasks.json:", e.message);
        } else {
            // Loga erros que não são instâncias de Error (raro, mas seguro)
            console.error("Erro desconhecido ao ler tasks.json:", e);
        }

        // Em qualquer falha de leitura ou parsing, retorna um array vazio.
        return [];
    }
};

/**
 * Escreve o array de tarefas de volta no arquivo tasks.json de forma síncrona.
 * @param {Task[]} tasks O array de tarefas a ser escrito.
 */
export const writeTasks = (tasks: Task[]): void => {
    try {
        const data = JSON.stringify(tasks, null, 2);
        // Escreve os dados no caminho corrigido.
        fs.writeFileSync(TASKS_FILE_PATH, data, "utf-8");
    } catch (e) {
        // --- Tratamento do Erro de Tipagem do TypeScript ---
        if (e instanceof Error) {
            console.error("Erro ao escrever tasks.json:", e.message);
        } else {
            console.error("Erro desconhecido ao escrever tasks.json:", e);
        }
        // Nota: Em Serverless, as alterações no disco são perdidas após a execução,
        // mas o write é crucial para que a API funcione durante a requisição.
    }
};
