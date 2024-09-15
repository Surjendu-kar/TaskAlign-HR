import React from "react";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import TaskInput from "./TaskInput";
import ActionBar from "./ActionBar";
import BottomBar from "./BottomBar";

const FormContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 1.5, 0),
  border: "1px solid #e6e6e6",
}));

interface TaskPopupProps extends Omit<UseTaskFormReturn, "id"> {
  onClose: () => void;
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
  handleAddTask,
  resetForm,
  isEditing,
}: TaskPopupProps): JSX.Element {
  const handleClose = () => {
    resetForm();
    onClose();
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
        handleAddTask={handleAddTask}
        taskName={taskName}
        isEditing={isEditing}
      />
    </FormContainer>
  );
}

export default TaskPopup;
