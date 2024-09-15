"use client";
import React from "react";
import { Add } from "@mui/icons-material";
import { styled, Typography } from "@mui/material";
import TaskPopup from "../ManageTask/TaskPopup";

const StyledButton = styled("button")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  fontSize: "14px",
  color: "#db4c3f",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  borderRadius: "15px",
  transition: "0.2s",
  width: "auto",
  "&:hover": {
    backgroundColor: "#ffecea",
  },
}));

const AddText = styled(Typography)({
  fontSize: "0.85rem",
  textTransform: "capitalize",
  color: "#333",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#db4c3f",
  },
});

interface AddTaskButtonProps {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddTaskButton({ setIsFormOpen }: AddTaskButtonProps) {
  const handleClickOpen = () => {
    setIsFormOpen(true);
  };

  return (
    <StyledButton onClick={handleClickOpen}>
      <Add fontSize="small" />
      <AddText>Add task</AddText>
    </StyledButton>
  );
}

export default AddTaskButton;
