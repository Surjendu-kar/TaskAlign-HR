import React from "react";
import { Dialog, DialogContent, styled } from "@mui/material";
// import TaskPopup from "../ManageTask/TaskPopup";
// import { useTaskForm } from "@/hooks/useTaskForm";

const TransparentDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "transparent",
    boxShadow: "none",
    maxWidth: "600px",
    width: "100%",
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    margin: 0,
  },
  "& .MuiDialogContent-root": {
    padding: 0,
  },
}));

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose }) => {
  // const taskForm = useTaskForm(onClose);

  return (
    <TransparentDialog open={open} onClose={onClose} maxWidth="sm">
      <DialogContent>
        {/* <TaskPopup onClose={onClose} {...taskForm} /> */}
      </DialogContent>
    </TransparentDialog>
  );
};

export default TaskModal;
