import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export const useTaskForm = (onClose?: () => void): UseTaskFormReturn => {
  const [id, setId] = useState<string>(uuidv4());
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<number>(4);
  const [dueDate, setDueDate] = useState<dayjs.Dayjs>(dayjs());

  const resetForm = useCallback(() => {
    setId(uuidv4());
    setTaskName("");
    setDescription("");
    setPriority(4);
    setDueDate(dayjs());
  }, []);

  const handleAddTask = useCallback(async () => {
    console.log(dueDate);

    const formattedDueDate = dueDate
      ? {
          Date: dueDate.format("DD MMM YYYY"),
          Time: dueDate.format("HH:mm"),
        }
      : null;

    console.log("Adding task:", {
      id,
      taskName,
      description,
      priority,
      dueDate: formattedDueDate,
    });

    try {
      const baseEndPoint = `${process.env.NEXT_PUBLIC_BE_URL}/api/tasks`;
      const response = await fetch(baseEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          description: description,
          taskName: taskName,
          priority: priority,
          dueDate: dueDate,
        }),
      });

      if (response.ok) {
        console.log("Request submitted successfully");
        resetForm();
      } else {
        console.error("Failed to submit request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    }

    if (onClose) onClose();
  }, [id, taskName, description, priority, dueDate, resetForm, onClose]);

  return {
    id,
    taskName,
    setTaskName,
    description,
    setDescription,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    resetForm,
    handleAddTask,
  };
};
