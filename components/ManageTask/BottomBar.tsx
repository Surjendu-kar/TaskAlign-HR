import React from "react";
import { Box, Button, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CalendarToday } from "@mui/icons-material";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import loadingAnimation from "@/public/assets/loadingV4.json";

const LeftActions = styled("div")(({ theme }) => ({
  margin: "10px 0",
  display: "flex",
  gap: theme.spacing(1),
}));

const RightActions = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

const CancelButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  padding: "0",
  height: "30px",
  color: "#444",
  fontSize: "12px",
  backgroundColor: "#f5f5f5",
  "&:hover": {
    backgroundColor: "#e7e7e7",
  },
}));

const AddTaskButton = styled(CancelButton)(({ theme }) => ({
  backgroundColor: "#db4c3f",
  color: "white",
  "&:hover": {
    backgroundColor: "#c53727",
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  cursor: "pointer",
  background: "transparent",
  border: "1px solid #e6e6e6",
  borderRadius: theme.spacing(0.5),
  height: "24px",
  fontSize: "0.75rem",
  "& .MuiChip-deleteIcon": {
    fontSize: "16px",
  },
  "& .MuiChip-label": {
    padding: "9px",
  },
  "&:hover": {
    background: "#f5f5f5",
  },
}));

interface BottomBarProps {
  onClose: () => void;
  handleSubmit: () => void;
  taskName: string;
  isEditing: boolean;
  isLoading: boolean;
}

const BottomBar: React.FC<BottomBarProps> = ({
  onClose,
  handleSubmit,
  taskName,
  isEditing,
  isLoading,
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <LeftActions>
        <StyledChip
          icon={<CalendarToday style={{ fontSize: "14px" }} />}
          label="Inbox"
          variant="outlined"
        />
      </LeftActions>
      <RightActions>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
        <AddTaskButton
          variant="contained"
          onClick={handleSubmit}
          disabled={!taskName.trim() || isLoading}
        >
          {isLoading ? (
            <LoadingAnimation animationData={loadingAnimation} />
          ) : isEditing ? (
            "Save"
          ) : (
            "Add task"
          )}
        </AddTaskButton>
      </RightActions>
    </Box>
  );
};

export default BottomBar;
