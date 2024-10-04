"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import TaskInput from "./TaskInput";
import ActionBar from "./ActionBar";
import BottomBar from "./BottomBar";
import { Dayjs } from "dayjs";

const FormContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 1.5, 0),
  border: "1px solid #e6e6e6",
}));

interface TaskPopupProps {
  onClose: () => void;
  taskName: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  priority: number;
  setPriority: React.Dispatch<React.SetStateAction<number>>;
  dueDate: Dayjs;
  setDueDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  handleAddOrUpdateTask: () => Promise<void>;
  resetForm: () => void;
  isEditing: boolean;
}

function TaskPopup({
  onClose,
  taskName,
  setTaskName,
  description,
  setDescription,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  handleAddOrUpdateTask,
  resetForm,
  isEditing,
}: TaskPopupProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await handleAddOrUpdateTask();
      handleClose();
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <TaskInput
        taskName={taskName}
        setTaskName={setTaskName}
        description={description}
        setDescription={setDescription}
      />

      <ActionBar
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
      />
      <BottomBar
        onClose={handleClose}
        handleSubmit={handleSubmit}
        taskName={taskName}
        isEditing={isEditing}
        isLoading={isLoading}
      />
    </FormContainer>
  );
}

export default TaskPopup;
