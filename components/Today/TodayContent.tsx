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

  const {
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
  } = useTaskForm(initialTasks);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
            taskName={taskName}
            setTaskName={setTaskName}
            description={description}
            setDescription={setDescription}
            priority={priority}
            setPriority={setPriority}
            dueDate={dueDate}
            setDueDate={setDueDate}
            handleAddOrUpdateTask={handleAddOrUpdateTask}
            resetForm={resetForm}
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
