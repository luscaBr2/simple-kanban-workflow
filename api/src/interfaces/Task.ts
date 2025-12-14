export type TaskStatus = "To Do" | "In Progress" | "Done" | "Blocked";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt?: string; // Opcional
}

// Interface para o corpo da requisição POST/PUT
export interface TaskBody {
    title?: string;
    description?: string;
    status?: TaskStatus;
}
