import React, { useState } from "react";
import {
  Stack,
  styled,
  Typography,
  Avatar,
  Box,
  Badge,
  Button,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { usePathname, useRouter } from "next/navigation";
import TaskModal from "./TaskModal";
import NavItems from "./NavItems";
import ProjectSection from "./ProjectSection";
import Link from "next/link";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { signOut, useSession } from "next-auth/react";
import NavbarMenu from "./NavbarMenu";

const DrawerContent = styled(Stack)(({ theme }) => ({
  width: 280,
  height: "100%",
  padding: theme.spacing(2),
  backgroundColor: "#fafafa",
  overflowY: "auto",
  gap: theme.spacing(1),
  [theme.breakpoints.down("sm")]: { width: "100%" },
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

// const AddTaskButton = styled("button")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   gap: theme.spacing(1),
//   padding: theme.spacing(1, 1, 1, 0.5),
//   fontSize: "14px",
//   color: "#db4c3f",
//   backgroundColor: "transparent",
//   border: "none",
//   cursor: "pointer",
//   borderRadius: "5px",
//   transition: "0.2s",
//   "&:hover": {
//     backgroundColor: "#ffecea",
//   },
// }));

// const AddText = styled(Typography)(({ theme }) => ({
//   fontSize: "0.85rem",
//   [theme.breakpoints.down("sm")]: { fontSize: "0.9rem" },
// }));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  cursor: "pointer",
  padding: "5px 5px 5px 0",
  borderRadius: "7px",
  "&:hover": {
    backgroundColor: "#f2efed",
  },
}));

interface NavbarProps {
  isOpen: boolean;
  toggleNav: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleNav }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleTaskModalOpen = () => setTaskModalOpen((prev) => !prev);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawer = () => {
    if (isSmallScreen) {
      toggleNav();
    }
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      onClose={toggleNav}
      ModalProps={{
        keepMounted: true,
        disableScrollLock: true,
        BackdropProps: {
          invisible: true,
        },
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          backgroundColor: "transparent",
          border: "none",
          boxShadow: isOpen ? "0 0 10px rgba(0,0,0,0.1)" : "none",
          width: isSmallScreen ? "100%" : 280,
        },
      }}
    >
      <DrawerContent>
        <TaskModal open={taskModalOpen} onClose={toggleTaskModalOpen} />

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={1}
        >
          <UserBox onClick={handleMenuOpen}>
            <AvatarStyle>
              {session?.user?.name ? session.user.name[0].toUpperCase() : "?"}
            </AvatarStyle>
            <NameStyle variant="subtitle1">
              {session?.user?.name || "Guest"}
            </NameStyle>
            <KeyboardArrowDownIcon
              sx={{ width: "18px", height: "20px", color: "#00000080" }}
            />
          </UserBox>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Link href={"/in-development"} onClick={handleDrawer}>
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
            <CloseButton onClick={toggleNav}>&#9776;</CloseButton>
          </Box>
        </Box>

        <NavbarMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onLogout={handleLogout}
          handleDrawer={handleDrawer}
        />

        {/* <AddTaskButton onClick={toggleTaskModalOpen}>
          <AddIcon fontSize="small" />
          <AddText>Add task</AddText>
        </AddTaskButton> */}

        <Stack gap={2}>
          <NavItems pathname={pathname} toggleNav={toggleNav} />
          <ProjectSection />
        </Stack>
      </DrawerContent>
    </Drawer>
  );
};

export default Navbar;
