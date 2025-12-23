import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    DndContext,
    useDraggable,
    useDroppable,
    closestCorners,
    type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import "./TaskList.css";

// --- Tipagens ---

interface Task {
    id: string;
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Done" | "Blocked";
    createdAt: string;
    updatedAt?: string;
}

type TaskStatus = "To Do" | "In Progress" | "Done" | "Blocked";
const ALL_STATUSES: TaskStatus[] = ["To Do", "In Progress", "Done", "Blocked"];

const API_BASE_URL = `${
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
}/api/v1/tasks`;

const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    return "Ocorreu um erro desconhecido.";
};

// --- Componentes Reutilizáveis ---

const TaskCard: React.FC<{ task: Task }> = React.memo(({ task }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: task.id,
            data: { task },
        });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 100 : "auto",
        cursor: "grab",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`task-card status-${task.status.replace(/\s/g, "-")}`}
            {...attributes}
            {...listeners}
        >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-meta">
                <span className="date-info">
                    Criado: {new Date(task.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
});

const KanbanColumn: React.FC<{ status: TaskStatus; tasks: Task[] }> =
    React.memo(({ status, tasks }) => {
        const { setNodeRef, isOver } = useDroppable({
            id: status,
        });

        const style = {
            backgroundColor: isOver ? "#e3e4e7" : "#ebecf0",
            border: isOver ? "2px dashed #007bff" : "none",
        };

        return (
            <div ref={setNodeRef} style={style} className="kanban-column">
                <h2>
                    {status} ({tasks.length})
                </h2>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
                {tasks.length === 0 && (
                    <p className="no-tasks-message">Arraste tarefas para cá.</p>
                )}
            </div>
        );
    });

// --- Componente Principal ---

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const tasksByStatus = useMemo(() => {
        return ALL_STATUSES.reduce((acc, status) => {
            acc[status] = tasks.filter((task) => task.status === status);
            return acc;
        }, {} as Record<TaskStatus, Task[]>);
    }, [tasks]);

    // Busca inicial (Única vez que o loading principal é usado)
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error("Falha ao buscar as tarefas.");
            const data: Task[] = await response.json();
            setTasks(data);
        } catch (error: unknown) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, []);

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) return;

        try {
            const response = await fetch(API_BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description }),
            });

            if (!response.ok) throw new Error("Falha ao adicionar a tarefa.");
            const newTask: Task = await response.json();

            setTasks((prevTasks) => [...prevTasks, newTask]);
            setTitle("");
            setDescription("");
        } catch (error: unknown) {
            setError(`Erro ao adicionar: ${getErrorMessage(error)}`);
        }
    };

    // FUNÇÃO REFORMULADA: Sincroniza em segundo plano SEM usar fetchTasks()
    const updateTaskStatusAPI = async (
        taskId: string,
        newStatus: TaskStatus
    ) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error("Erro no servidor ao salvar status.");
            }
            // SUCESSO SILENCIOSO: Não chamamos fetchTasks() aqui,
            // pois o handleDragEnd já atualizou a tela para o usuário.
        } catch (error: unknown) {
            const message = getErrorMessage(error);
            setError(`Erro ao sincronizar: ${message}. Revertendo...`);
            // Em caso de erro real, aí sim recarregamos para garantir a integridade
            fetchTasks();
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const taskId = String(active.id);
        const newStatus = over.id as TaskStatus;

        const taskToMove = tasks.find((t) => t.id === taskId);
        if (!taskToMove || taskToMove.status === newStatus) return;

        // 1. Atualização Otimista (INSTANTÂNEA NA TELA)
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );

        // 2. Persistência (EM SEGUNDO PLANO)
        updateTaskStatusAPI(taskId, newStatus);
    };

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // O loading só bloqueia a tela no carregamento INICIAL
    if (loading && tasks.length === 0)
        return <div className="loading-message">Carregando tarefas...</div>;

    return (
        <div className="kanban-container">
            <h1>Simple Workflow Kanban</h1>

            {error && (
                <div className="error-message" onClick={() => setError(null)}>
                    {error} <span>(clique para fechar)</span>
                </div>
            )}

            <form onSubmit={handleAddTask} className="add-task-form">
                <input
                    type="text"
                    placeholder="Título da Tarefa"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Adicionar Tarefa</button>
            </form>

            <DndContext
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
            >
                <div className="kanban-board">
                    {ALL_STATUSES.map((status) => (
                        <KanbanColumn
                            key={status}
                            status={status}
                            tasks={tasksByStatus[status]}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

export default TaskList;
