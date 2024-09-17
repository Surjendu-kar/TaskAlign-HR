import React, { useState } from "react";
import { Stack, styled, Typography, Avatar, Box, Badge } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { usePathname } from "next/navigation";
import TaskModal from "./TaskModal";
import NavItems from "./NavItems";
import ProjectSection from "./ProjectSection";
import Link from "next/link";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

interface NavbarProps {
  isOpen: boolean;
  toggleNav: () => void;
}
interface MainContainerProps {
  isOpen: boolean;
}

const MainContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<MainContainerProps>(({ theme, isOpen }) => ({
  gap: theme.spacing(1),
  height: "100%",
  width: isOpen ? "280px" : "0",
  position: "fixed",
  zIndex: 1,
  top: 0,
  left: 0,
  backgroundColor: "#fafafa",
  overflowX: "hidden",
  overflowY: isOpen ? "auto" : "hidden",
  transition: "0.3s",
  padding: isOpen ? theme.spacing(2) : 0,
  boxShadow: isOpen ? "0 0 10px rgba(0,0,0,0.1)" : "none",
  visibility: isOpen ? "visible" : "hidden",

  [theme.breakpoints.down("sm")]: { width: isOpen ? "100%" : "0" },
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  background: "#db4c3f",
  width: 27,
  height: 27,
  fontSize: 14,
  [theme.breakpoints.down("sm")]: { width: 30, height: 30, fontSize: 14 },
}));

const NameStyle = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  [theme.breakpoints.down("sm")]: { fontSize: "1rem" },
}));

const CloseButton = styled("a")(({ theme }) => ({
  marginRight: "3px",
  fontSize: "18px",
  cursor: "pointer",
  padding: "5px",
  borderRadius: "5px",

  "&:hover": {
    backgroundColor: "#ebe8e89e",
  },
  [theme.breakpoints.down("sm")]: { fontSize: "20px" },
}));

const AddTaskButton = styled("button")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 1, 1, 0.5),
  fontSize: "14px",
  color: "#db4c3f",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  transition: "0.2s",
  "&:hover": {
    backgroundColor: "#ffecea",
  },
}));

const AddText = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  [theme.breakpoints.down("sm")]: { fontSize: "0.9rem" },
}));

const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleNav }) => {
  const pathname = usePathname();
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const toggleTaskModalOpen = () => setTaskModalOpen((prev) => !prev);

  return (
    <MainContainer isOpen={isOpen}>
      <TaskModal open={taskModalOpen} onClose={toggleTaskModalOpen} />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={1}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AvatarStyle>N</AvatarStyle>
          <NameStyle variant="subtitle1">Rahul</NameStyle>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link href={"/notifications"}>
            <Badge
              badgeContent={0}
              sx={{
                "& .MuiBadge-badge": {
                  color: "#db4c3f",
                  backgroundColor: "#ffecea",
                },
              }}
            >
              <NotificationsNoneIcon sx={{ color: "#db4c3f" }} />
            </Badge>
          </Link>
          {isOpen && <CloseButton onClick={toggleNav}>&#9776;</CloseButton>}
        </Box>
      </Box>

      <AddTaskButton onClick={toggleTaskModalOpen}>
        <AddIcon fontSize="small" />
        <AddText>Add task</AddText>
      </AddTaskButton>

      <Stack gap={2}>
        <NavItems pathname={pathname} />
        <ProjectSection />
      </Stack>

      <Stack mt="auto">
        {/* <NavItem href="/add-team">
          <AddIcon fontSize="small" />
          <NavText>Add team</NavText>
        </NavItem>
        <NavItem href="/templates">
          <NavText>Browse templates</NavText>
        </NavItem> */}
      </Stack>
    </MainContainer>
  );
};

export default Navbar;
