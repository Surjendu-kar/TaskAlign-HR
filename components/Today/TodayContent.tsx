"use client";
import React, { useState, useEffect } from "react";
import {
  styled,
  CircularProgress,
  Stack,
  Typography,
  Snackbar,
} from "@mui/material";
import AddTaskButton from "@/components/AddTask/AddTaskButton";
import TaskPopup from "@/components/ManageTask/TaskPopup";
import { useTaskForm } from "@/hooks/useTaskForm";
import TaskList from "../ManageTask/TaskList";
import { v4 as uuidv4 } from "uuid";

const MainContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

const AddTaskButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  marginTop: "0.5rem",
});

const Heading = styled(Typography)({
  fontSize: "1.7rem",
  fontWeight: "bold",
});
interface TodayContentProps {
  initialTasks: Task[];
}

export function TodayContent({ initialTasks }: TodayContentProps): JSX.Element {
  const [isClient, setIsClient] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [deletingTasks, setDeletingTasks] = useState<string[]>([]);
  const [addingTasks, setAddingTasks] = useState<string[]>([]);

  useEffect(() => {
    setIsClient(true);
    setTasks(initialTasks);
  }, [initialTasks]);

  // const taskForm = useTaskForm(() => {

  //   if (editingTask) {
  //     setTasks(
  //       tasks.map((task) =>
  //         task.id === editingTask.id
  //           ? {
  //               ...task,
  //               taskName: taskForm.taskName,
  //               description: taskForm.description,
  //               priority: taskForm.priority,
  //               dueDate: taskForm.dueDate,
  //             }
  //           : task
  //       )
  //     );
  //     setEditingTask(null);
  //   } else {
  //     setTasks([
  //       {
  //         id: taskForm.id,
  //         taskName: taskForm.taskName,
  //         description: taskForm.description,
  //         priority: taskForm.priority,
  //         dueDate: taskForm.dueDate,
  //       },
  //       ...tasks,
  //     ]);
  //   }
  //   setIsFormOpen(false);
  // });
  const handleAddTask = async (taskData: Omit<Task, "id">) => {
    const newId = uuidv4();
    const newTask = { id: newId, ...taskData };

    try {
      setAddingTasks((prev) => [...prev, newId]);

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

    setIsFormOpen(false);
  };

  const taskForm = useTaskForm(handleAddTask);

  const handleDeleteTask = async (taskId: string) => {
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
        setTasks(tasks.filter((task) => task.id !== taskId));
        setDeletingTasks((prev) => prev.filter((id) => id !== taskId));
        setSnackbarMessage("1 task completed");
        setSnackbarOpen(true);
      }, 300);
    } catch (error) {
      console.error("Error deleting task:", error);
      setDeletingTasks((prev) => prev.filter((id) => id !== taskId));
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    taskForm.setTaskName(task.taskName);
    taskForm.setDescription(task.description);
    taskForm.setPriority(task.priority);
    taskForm.setDueDate(task.dueDate);
    setIsFormOpen(true);
  };

  const handleSnackbarClose = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (!isClient) {
    return <CircularProgress />;
  }

  if (!isClient) {
    return <CircularProgress />;
  }

  return (
    <MainContainer>
      <Heading>Today</Heading>

      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        deletingTasks={deletingTasks}
        addingTasks={addingTasks}
      />

      <AddTaskButtonContainer>
        {!isFormOpen ? (
          <AddTaskButton setIsFormOpen={setIsFormOpen} />
        ) : (
          <TaskPopup
            onClose={() => setIsFormOpen(false)}
            {...taskForm}
            isEditing={!!editingTask}
          />
        )}
      </AddTaskButtonContainer>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </MainContainer>
  );
}
