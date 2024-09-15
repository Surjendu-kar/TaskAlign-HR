import React from "react";
import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled(InputBase)(({ theme }) => ({
  fontSize: "0.8rem",
}));

interface TaskInputProps {
  taskName: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const TaskInput: React.FC<TaskInputProps> = ({
  taskName,
  setTaskName,
  description,
  setDescription,
}) => {
  return (
    <>
      <Input
        placeholder="Task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        fullWidth
        sx={{ fontWeight: "bold" }}
        autoFocus
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
    </>
  );
};

export default TaskInput;
