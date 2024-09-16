import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
  styled,
  Divider,
  Collapse,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";

const StyledListItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "0px 0px",
  "&:hover .edit-button": {
    opacity: 1,
  },
});

const TaskContent = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flex: 1,
});

const TaskTitle = styled(Typography)({
  fontSize: "0.9rem",
  fontWeight: "bold",
});

const Title = styled(Typography)({
  fontSize: "0.85rem",
});

const Description = styled(Typography)({
  fontSize: "0.8rem",
});

const priorityColors: { [key: number]: string } = {
  1: "#d1453b",
  2: "#eb8909",
  3: "#246fe0",
  4: "#9e9e9e",
};

const TimeDisplayBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "priority",
})<{ priority: number }>(({ priority }) => ({
  display: "flex",
  alignItems: "center",
  color: priorityColors[priority],
}));

const Time = styled(Typography)({
  fontSize: "0.7rem",
});

const StyledCalendarIcon = styled(CalendarTodayIcon)({
  fontSize: "0.6rem",
  marginRight: "4px",
});

const StyledDivider = styled(Divider)({
  margin: "8px 0",
  borderBottom: "1px solid #eee",
});

const EditButton = styled(IconButton)({
  opacity: 0,
  transition: "opacity 0.2s ease-in-out",
});
const CircleIcon: React.FC<{ priority: number; onDelete: () => void }> = ({
  priority,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
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
      onClick={onDelete}
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
  );
};

interface TaskGroupProps {
  title: string;
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  isToday: boolean;
  hasOverdueTasks: boolean;
  deletingTasks: string[];
  addingTasks: string[];
}

const TaskGroup: React.FC<TaskGroupProps> = ({
  title,
  tasks,
  onDeleteTask,
  onEditTask,
  isToday,
  hasOverdueTasks,
  deletingTasks,
  addingTasks,
}) => {
  const isOverdue = title.toLowerCase() === "overdue";
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          margin:
            title.toLowerCase() === "overdue"
              ? "0.8rem 0 0.5rem"
              : isToday && !hasOverdueTasks
              ? "0 0 0.5rem"
              : "2rem 0 0.5rem",
        }}
        onClick={toggleCollapse}
      >
        {isOverdue && (
          <IconButton size="small" sx={{ padding: 0, marginRight: "2px" }}>
            {isCollapsed ? (
              <ArrowForwardIosIcon
                sx={{
                  fontSize: "0.8rem",
                }}
              />
            ) : (
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: "1.2rem",
                }}
              />
            )}
          </IconButton>
        )}
        <TaskTitle>{title}</TaskTitle>
      </Box>

      <Collapse in={!isCollapsed}>
        <List disablePadding>
          {tasks.map((task) => (
            <Collapse
              key={task.id}
              in={!deletingTasks.includes(task.id)}
              appear={addingTasks.includes(task.id)}
              timeout={300}
              unmountOnExit
            >
              <StyledListItem
                sx={{
                  opacity: deletingTasks.includes(task.id) ? 0 : 1,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                <TaskContent>
                  <CircleIcon
                    priority={task.priority}
                    onDelete={() => onDeleteTask(task.id)}
                  />
                  <Box>
                    <ListItemText
                      sx={{ margin: 0 }}
                      primary={
                        <Title variant="body1" fontWeight="medium">
                          {task.taskName}
                        </Title>
                      }
                      secondary={
                        task.description && (
                          <Description variant="body2" color="text.secondary">
                            {task.description}
                          </Description>
                        )
                      }
                    />
                    <TimeDisplayBox priority={task.priority}>
                      <StyledCalendarIcon />
                      <Time>{task.dueDate.format("D MMM HH:mm")}</Time>
                    </TimeDisplayBox>
                  </Box>
                </TaskContent>

                <Box>
                  <EditButton
                    className="edit-button"
                    size="small"
                    onClick={() => onEditTask(task)}
                    aria-label="edit task"
                  >
                    <EditIcon fontSize="small" />
                  </EditButton>
                </Box>
              </StyledListItem>
              <StyledDivider />
            </Collapse>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default TaskGroup;
