import { Task } from "../interfaces/Task";
import { randomUUID } from "crypto";

let tasksInMemory: Task[] = [
    {
        id: randomUUID(),
        title: "Tarefa Inicial",
        description: "Status atualizado via memória!",
        status: "To Do",
        createdAt: new Date().toISOString(),
    },
];

export const readTasks = (): Task[] => tasksInMemory;

export const writeTasks = (tasks: Task[]): void => {
    tasksInMemory = tasks;
};
