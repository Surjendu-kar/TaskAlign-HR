import React, { useState } from "react";
import {
  Stack,
  Chip,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Button,
  Popover,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Flag,
  MoreHoriz,
  KeyboardArrowDown,
  Check,
  Today,
} from "@mui/icons-material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers";

const ActionBar = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
  [theme.breakpoints.down("sm")]: { flexWrap: "wrap", marginTop: "0.15rem" },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  cursor: "pointer",
  background: "transparent",
  border: "1px solid #e6e6e6",
  borderRadius: theme.spacing(0.5),
  height: "25px",
  fontSize: "0.75rem",
  "& .MuiChip-label": {
    padding: "0 8px",
  },
  "&:hover": {
    background: "#f5f5f5",
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "10px",
    marginTop: "4px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e6e6e6",
  },
  "& .MuiList-root": {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "12px",
  padding: "4px 10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const TodayButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "dateColor",
})<{ dateColor: string }>(({ theme, dateColor }) => ({
  fontSize: "0.75rem",
  padding: "1px 8px",
  minWidth: "unset",
  borderRadius: theme.spacing(0.5),
  border: "1px solid #e6e6e6",
  color: dateColor,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  "& .MuiButton-startIcon": {
    marginRight: "2px",
  },
}));

const priorityColors: { [key: number]: string } = {
  1: "#d1453b",
  2: "#eb8909",
  3: "#246fe0",
  4: "#9e9e9e",
};

const dateColors = {
  today: "#058527",
  tomorrow: "#ad6200",
  future: "#692ec2",
};

interface ActionBarProps {
  priority: number;
  setPriority: React.Dispatch<React.SetStateAction<number>>;
  dueDate: dayjs.Dayjs;
  setDueDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

const ActionBarComponent: React.FC<ActionBarProps> = ({
  priority,
  setPriority,
  dueDate,
  setDueDate,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [datePickerAnchorEl, setDatePickerAnchorEl] =
    useState<null | HTMLElement>(null);
  const [tempDate, setTempDate] = useState<dayjs.Dayjs | null>(dueDate);

  const handlePriorityClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePriorityClose = () => {
    setAnchorEl(null);
  };

  const handlePrioritySelect = (newPriority: number) => {
    setPriority(newPriority);
    handlePriorityClose();
  };

  const handleTodayClick = (event: React.MouseEvent<HTMLElement>) => {
    setDatePickerAnchorEl(event.currentTarget);
  };

  const handleDatePickerClose = () => {
    setDatePickerAnchorEl(null);
  };

  const handleDatePickerAccept = () => {
    if (tempDate) {
      setDueDate(tempDate);
    }
    handleDatePickerClose();
  };

  const getButtonLabel = () => {
    const today = dayjs();
    const tomorrow = today.add(1, "day");
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (dueDate.isSame(today, "day")) {
      return `Today ${dueDate.format("HH:mm")}`;
    } else if (dueDate.isSame(tomorrow, "day")) {
      return `Tomorrow ${dueDate.format("HH:mm")}`;
    } else {
      const diffDays = dueDate.diff(today, "day");
      if (diffDays < 6) {
        const dayName = dayNames[dueDate.day()];
        return `${dayName} ${dueDate.format("HH:mm")}`;
      } else {
        return `${dueDate.format("D MMM HH:mm")}`;
      }
    }
  };

  const getDateColor = () => {
    const today = dayjs();
    const tomorrow = today.add(1, "day");

    if (dueDate.isSame(today, "day")) {
      return dateColors.today;
    } else if (dueDate.isSame(tomorrow, "day")) {
      return dateColors.tomorrow;
    } else {
      return dateColors.future;
    }
  };

  return (
    <ActionBar>
      <TodayButton
        onClick={handleTodayClick}
        startIcon={
          <Today
            fontSize="small"
            style={{
              fontSize: "14px",
              color: getDateColor(),
            }}
          />
        }
        dateColor={getDateColor()}
      >
        {getButtonLabel()}
      </TodayButton>
      <Popover
        open={Boolean(datePickerAnchorEl)}
        anchorEl={datePickerAnchorEl}
        onClose={handleDatePickerClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            orientation="landscape"
            value={tempDate}
            onChange={(newValue) => setTempDate(newValue)}
            onAccept={handleDatePickerAccept}
            onClose={handleDatePickerClose}
          />
        </LocalizationProvider>
      </Popover>
      <StyledChip
        icon={
          <Flag
            style={{
              fontSize: "14px",
              color: priorityColors[priority],
            }}
          />
        }
        label={`Priority ${priority}`}
        onClick={handlePriorityClick}
        deleteIcon={<KeyboardArrowDown />}
        onDelete={handlePriorityClick}
      />
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handlePriorityClose}
      >
        {[1, 2, 3, 4].map((p) => (
          <StyledMenuItem key={p} onClick={() => handlePrioritySelect(p)}>
            <Box display="flex" alignItems="center">
              <Flag
                style={{
                  marginRight: 5,
                  fontSize: "20px",
                  color: priorityColors[p],
                }}
              />
              Priority {p}
            </Box>
            {priority === p && (
              <Check sx={{ fontSize: 15, color: "red", marginLeft: "5px" }} />
            )}
          </StyledMenuItem>
        ))}
      </StyledMenu>
      <StyledChip
        icon={<AccessAlarmIcon style={{ fontSize: "14px" }} />}
        label="Reminders"
      />
      <IconButton size="small">
        <MoreHoriz fontSize="small" />
      </IconButton>
    </ActionBar>
  );
};

export default ActionBarComponent;
