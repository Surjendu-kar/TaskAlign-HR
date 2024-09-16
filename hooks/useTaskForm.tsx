import { useState, useCallback } from "react";
import dayjs from "dayjs";

export const useTaskForm = (
  onSubmit: (taskData: Omit<Task, "id">) => void
): UseTaskFormReturn => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<number>(4);
  const [dueDate, setDueDate] = useState<dayjs.Dayjs>(dayjs());

  const resetForm = useCallback(() => {
    setTaskName("");
    setDescription("");
    setPriority(4);
    setDueDate(dayjs());
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit({
      taskName,
      description,
      priority,
      dueDate,
    });
    resetForm();
  }, [taskName, description, priority, dueDate, onSubmit, resetForm]);

  return {
    taskName,
    setTaskName,
    description,
    setDescription,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    resetForm,
    handleSubmit,
  };
};
