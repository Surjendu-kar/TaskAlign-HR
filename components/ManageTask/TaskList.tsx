import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import dayjs from "dayjs";
import TaskGroup from "./TaskGroup";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  deletingTasks: string[];
  addingTasks: string[];
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleteTask,
  onEditTask,
  deletingTasks,
  addingTasks,
}) => {
  const now = dayjs();

  // Convert string dates to dayjs objects
  const tasksWithDayjs = tasks.map((task) => ({
    ...task,
    dueDate: dayjs(task.dueDate),
  }));

  const overdueTasks = tasksWithDayjs.filter((task) =>
    task.dueDate.isBefore(now)
  );
  const upcomingTasks = tasksWithDayjs.filter(
    (task) => !task.dueDate.isBefore(now)
  );

  // Group upcoming tasks by date
  const groupedTasks = upcomingTasks.reduce((acc, task) => {
    const dateKey = task.dueDate.format("YYYY-MM-DD");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  // Sort dates for upcoming tasks
  const sortedDates = Object.keys(groupedTasks).sort((a, b) =>
    dayjs(a).diff(dayjs(b))
  );

  const getTitleForDate = (dateKey: string) => {
    const date = dayjs(dateKey);
    if (date.isSame(now, "day")) {
      return overdueTasks.length === 0
        ? ""
        : `${date.format("D MMM")} · Today · ${date.format("dddd")}`;
    } else if (date.isSame(now.add(1, "day"), "day")) {
      return `${date.format("D MMM")} · Tomorrow · ${date.format("dddd")}`;
    } else {
      return date.format("D MMM · dddd");
    }
  };

  const totalTasks = tasks.length;
  const isToday =
    sortedDates.length > 0 && dayjs(sortedDates[0]).isSame(now, "day");
  const hasOverdueTasks = overdueTasks.length > 0;

  return (
    <Paper elevation={0} sx={{ mt: "5px" }}>
      {totalTasks !== 0 && (
        <Box
          display="flex"
          alignItems="center"
          sx={{
            mb: isToday && !hasOverdueTasks ? 1 : 2,
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ m: "0 4px 0 2px", color: "text.secondary", fontSize: "15px" }}
          />
          <Typography color="text.secondary" fontSize={"13px"}>
            {totalTasks} task{totalTasks !== 1 ? "s" : ""}
          </Typography>
        </Box>
      )}

      {overdueTasks.length > 0 && (
        <TaskGroup
          title="Overdue"
          tasks={overdueTasks}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          isToday={false}
          hasOverdueTasks={hasOverdueTasks}
          deletingTasks={deletingTasks}
          addingTasks={addingTasks}
        />
      )}

      {sortedDates.map((dateKey) => (
        <TaskGroup
          key={dateKey}
          title={getTitleForDate(dateKey)}
          tasks={groupedTasks[dateKey]}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          isToday={dayjs(dateKey).isSame(now, "day")}
          hasOverdueTasks={hasOverdueTasks}
          deletingTasks={deletingTasks}
          addingTasks={addingTasks}
        />
      ))}
    </Paper>
  );
};

export default TaskList;
