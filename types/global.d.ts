declare global {
  interface Task {
    id: string;
    taskName: string;
    description: string;
    priority: number;
    dueDate: Dayjs;
  }

  interface UseTaskFormReturn {
    tasks: Task[];
    taskName: string;
    setTaskName: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    priority: number;
    setPriority: React.Dispatch<React.SetStateAction<number>>;
    dueDate: Dayjs;
    setDueDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    editingTask: Task | null;
    isFormOpen: boolean;
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    snackbarOpen: boolean;
    snackbarMessage: string;
    deletingTasks: string[];
    addingTasks: string[];
    resetForm: () => void;
    handleAddOrUpdateTask: () => Promise<void>;
    handleDeleteTask: (taskId: string) => Promise<void>;
    handleEditTask: (task: Task) => void;
    handleSnackbarClose: (
      event: React.SyntheticEvent | Event,
      reason?: string
    ) => void;
  }
}

export {};
