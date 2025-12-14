import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { readTasks, writeTasks } from "../models/TaskModel";
import { Task, TaskBody, TaskStatus } from "../interfaces/Task";

const validStatuses: TaskStatus[] = ["To Do", "In Progress", "Done", "Blocked"];

const TaskController = {
    // [POST] Cria uma nova tarefa
    createTask(req: Request<{}, {}, TaskBody>, res: Response): void {
        const tasks = readTasks();
        const { title, description } = req.body;

        if (!title || !description) {
            res.status(400).json({
                error: "Título e descrição são obrigatórios.",
            });
            return;
        }

        const newTask: Task = {
            id: uuidv4(),
            title,
            description,
            status: "To Do",
            createdAt: new Date().toISOString(),
        };

        tasks.push(newTask);
        writeTasks(tasks);
        res.status(201).json(newTask);
    },

    // [GET] Lista todas as tarefas
    getAllTasks(_req: Request, res: Response): void {
        const tasks = readTasks();
        res.status(200).json(tasks);
    },

    // [GET] Busca tarefa por ID
    getTaskById(req: Request<{ id: string }>, res: Response): void {
        const tasks = readTasks();
        const task = tasks.find((t) => t.id === req.params.id);

        if (!task) {
            res.status(404).json({ error: "Tarefa não encontrada." });
            return;
        }
        res.status(200).json(task);
    },

    // [PUT] Atualiza uma tarefa existente
    updateTask(
        req: Request<{ id: string }, {}, TaskBody>,
        res: Response
    ): void {
        let tasks = readTasks();
        const taskId = req.params.id;
        const index = tasks.findIndex((t) => t.id === taskId);

        if (index === -1) {
            res.status(404).json({ error: "Tarefa não encontrada." });
            return;
        }

        const updates = req.body;
        const currentTask = tasks[index];

        // Regra de Workflow: Validação de status
        if (updates.status && !validStatuses.includes(updates.status)) {
            res.status(400).json({
                error: `Status inválido. Use um de: ${validStatuses.join(
                    ", "
                )}`,
            });
            return;
        }

        const updatedTask: Task = {
            ...currentTask,
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        tasks[index] = updatedTask;
        writeTasks(tasks);
        res.status(200).json(updatedTask);
    },

    // [DELETE] Deleta uma tarefa
    deleteTask(req: Request<{ id: string }>, res: Response): void {
        let tasks = readTasks();
        const taskId = req.params.id;
        const initialLength = tasks.length;

        tasks = tasks.filter((t) => t.id !== taskId);

        if (tasks.length === initialLength) {
            res.status(404).json({ error: "Tarefa não encontrada." });
            return;
        }

        writeTasks(tasks);
        res.status(204).send(); // 204 No Content
    },
};

export default TaskController;
