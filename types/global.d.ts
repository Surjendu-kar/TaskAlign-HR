import { Dayjs } from "dayjs";

declare global {
  interface Task {
    id: string;
    taskName: string;
    description: string;
    priority: number;
    dueDate: Dayjs;
  }

  interface UseTaskFormReturn {
    taskName: string;
    setTaskName: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    priority: number;
    setPriority: React.Dispatch<React.SetStateAction<number>>;
    dueDate: Dayjs;
    setDueDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    resetForm: () => void;
    handleSubmit: () => void;
  }
}

export {};
