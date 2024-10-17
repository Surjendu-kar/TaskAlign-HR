import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  InputBase,
  ListItem,
  Tooltip,
  Typography,
  styled,
  Zoom,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const SearchDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    padding: "0px 5px ",
    width: "100%",
    maxWidth: "700px",
    margin: 0,
    top: "5%",
    position: "absolute",
    boxShadow: "none",
  },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  fontSize: "1rem",
  padding: theme.spacing(1),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  padding: "5px 10px",
  cursor: "pointer",
  gap: theme.spacing(0.5),
}));

const TaskTitle = styled(Typography)({
  fontSize: "0.9rem",
  fontWeight: "normal",
});

const Description = styled(Typography)({
  fontSize: "0.8rem",
  color: "rgba(0, 0, 0, 0.6)",
});

const priorityColors: { [key: number]: string } = {
  1: "#d1453b",
  2: "#eb8909",
  3: "#246fe0",
  4: "#9e9e9e",
};

const CircleIcon: React.FC<{ priority: number }> = ({ priority }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1000);
  };

  return (
    <Tooltip
      title="This feature is currently in development"
      open={showTooltip}
      TransitionComponent={Zoom}
      arrow
    >
      <IconButton
        sx={{
          width: 18,
          height: 18,
          padding: 0,
          marginRight: 1,
          marginTop: "2px",
          border: `2px solid ${priorityColors[priority]}`,
          borderRadius: "50%",
          position: "relative",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: priorityColors[priority],
            transform: "scale(1.1)",
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <CheckIcon
          sx={{
            position: "absolute",
            fontSize: 16,
            color: isHovered ? "white" : "transparent",
            transition: "color 0.3s ease",
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

interface SearchComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const tasks = await response.json();
        const filteredTasks = tasks.filter(
          (task: Task) =>
            task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (searchTerm) {
      fetchTasks();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  return (
    <SearchDialog open={isOpen} onClose={onClose} fullWidth>
      <DialogContent sx={{ p: 0 }}>
        <Box display="flex" alignItems="center" sx={{ padding: "4px 8px" }}>
          <SearchIcon sx={{ color: "text.secondary" }} />
          <SearchInput
            autoFocus
            placeholder="Search tasks..."
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {searchResults.map((task) => (
          <StyledListItem key={task.id}>
            <CircleIcon priority={task.priority} />
            <Box flexGrow={1}>
              <TaskTitle>{task.taskName}</TaskTitle>
              {task.description && (
                <Description>{task.description}</Description>
              )}
            </Box>
          </StyledListItem>
        ))}
      </DialogContent>
    </SearchDialog>
  );
};

export default SearchComponent;
