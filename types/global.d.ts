import { Dayjs } from "dayjs";

declare global {
  interface Task {
    id: string;
    taskName: string;
    description: string;
    priority: number;
    dueDate: Dayjs;
  }

  interface UseTaskFormReturn extends Task {
    setTaskName: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setPriority: React.Dispatch<React.SetStateAction<number>>;
    setDueDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    resetForm: () => void;
    handleAddTask: () => void;
  }
}

export {};
