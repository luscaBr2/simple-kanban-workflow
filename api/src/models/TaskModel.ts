import * as fs from "fs";
import * as path from "path";
import { Task } from "../interfaces/Task";

const tasksFilePath = path.join(__dirname, "../data", "tasks.json");

const readTasks = (): Task[] => {
    try {
        const data = fs.readFileSync(tasksFilePath, "utf8");
        // Type assertion para garantir que o resultado é um array de Task
        return JSON.parse(data) as Task[];
    } catch (error) {
        return [];
    }
};

const writeTasks = (tasks: Task[]): void => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
};

export { readTasks, writeTasks };
