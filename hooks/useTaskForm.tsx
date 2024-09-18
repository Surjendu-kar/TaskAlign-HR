import { useState, useCallback, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";

export const useTaskForm = (initialTasks: Task[]): UseTaskFormReturn => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<number>(4);
  const [dueDate, setDueDate] = useState<Dayjs>(dayjs());
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [deletingTasks, setDeletingTasks] = useState<string[]>([]);
  const [addingTasks, setAddingTasks] = useState<string[]>([]);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const resetForm = useCallback(() => {
    setTaskName("");
    setDescription("");
    setPriority(4);
    setDueDate(dayjs());
    setEditingTask(null);
    setIsFormOpen(false);
  }, []);

  const handleAddOrUpdateTask = useCallback(async () => {
    const taskData = { taskName, description, priority, dueDate };

    if (editingTask) {
      // Update existing task
      try {
        const updatedTask = { id: editingTask.id, ...taskData };
        const response = await fetch(`/api/tasks`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });

        if (response.ok) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === editingTask.id ? updatedTask : task
            )
          );
          setSnackbarMessage("Task updated successfully");
          setSnackbarOpen(true);
        } else {
          throw new Error("Failed to update task");
        }
      } catch (error) {
        console.error("Error updating task:", error);
        setSnackbarMessage("Failed to update task");
        setSnackbarOpen(true);
      }
    } else {
      // Add new task
      const newId = uuidv4();
      const newTask = { id: newId, ...taskData };

      try {
        setAddingTasks((prev) => [...prev, newId]);

        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          setTasks((prevTasks) => [newTask, ...prevTasks]);
          setSnackbarMessage("Task added successfully");
          setSnackbarOpen(true);

          setTimeout(() => {
            setAddingTasks((prev) => prev.filter((id) => id !== newId));
          }, 300);
        } else {
          throw new Error("Failed to add task");
        }
      } catch (error) {
        console.error("Error adding task:", error);
        setAddingTasks((prev) => prev.filter((id) => id !== newId));
        setSnackbarMessage("Failed to add task");
        setSnackbarOpen(true);
      }
    }

    resetForm();
  }, [taskName, description, priority, dueDate, editingTask, resetForm]);

  const handleDeleteTask = useCallback(async (taskId: string) => {
    try {
      setDeletingTasks((prev) => [...prev, taskId]);

      const response = await fetch(`/api/tasks?id=${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete task");
      }

      setTimeout(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setDeletingTasks((prev) => prev.filter((id) => id !== taskId));
        setSnackbarMessage("1 task completed");
        setSnackbarOpen(true);
      }, 300);
    } catch (error) {
      console.error("Error deleting task:", error);
      setDeletingTasks((prev) => prev.filter((id) => id !== taskId));
    }
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setTaskName(task.taskName);
    setDescription(task.description);
    setPriority(task.priority);
    setDueDate(task.dueDate);
    setIsFormOpen(true);
  }, []);

  const handleSnackbarClose = useCallback(
    (_: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setSnackbarOpen(false);
    },
    []
  );

  return {
    tasks,
    taskName,
    setTaskName,
    description,
    setDescription,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    editingTask,
    isFormOpen,
    setIsFormOpen,
    snackbarOpen,
    snackbarMessage,
    deletingTasks,
    addingTasks,
    resetForm,
    handleAddOrUpdateTask,
    handleDeleteTask,
    handleEditTask,
    handleSnackbarClose,
  };
};
