import React from "react";
import { Menu, MenuItem as MuiMenuItem, ListItemIcon } from "@mui/material";
import { styled } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PrintIcon from "@mui/icons-material/Print";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import StarIcon from "@mui/icons-material/Star";
import SyncIcon from "@mui/icons-material/Sync";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

interface NavbarMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const MenuItem = styled(MuiMenuItem)(() => ({
  fontSize: "13px",
  color: "inherit",
  borderRadius: "7px",
  padding: "8px 6px",
  "&:hover": {
    backgroundColor: "#eeeeee8a",
  },
}));

const NavbarMenu: React.FC<NavbarMenuProps> = ({
  anchorEl,
  open,
  onClose,
  onLogout,
}) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        style: {
          maxWidth: "300px",
          minWidth: "280px",
          boxShadow: "0 0 8px rgba(0, 0, 0, .12)",
          borderRadius: "10px",
          // minHeight: "400px",
          padding: "6px",
          marginTop: "0.5rem",
        },
      }}
      MenuListProps={{
        style: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        autoFocusItem: false,
      }}
    >
      <MenuItem onClick={() => handleNavigation("/in-development")}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={() => handleNavigation("/in-development")}>
        <ListItemIcon>
          <AddIcon fontSize="small" />
        </ListItemIcon>
        Add a team
      </MenuItem>
      <MenuItem onClick={() => handleNavigation("/in-development")}>
        <ListItemIcon>
          <AssessmentIcon fontSize="small" />
        </ListItemIcon>
        Activity log
      </MenuItem>
      <MenuItem onClick={() => handleNavigation("/in-development")}>
        <ListItemIcon>
          <PrintIcon fontSize="small" />
        </ListItemIcon>
        Print
      </MenuItem>
      <MenuItem onClick={() => handleNavigation("/in-development")}>
        <ListItemIcon>
          <MenuBookIcon fontSize="small" />
        </ListItemIcon>
        Resources
      </MenuItem>
      <MenuItem onClick={() => handleNavigation("/in-development")}>
        <ListItemIcon>
          <CardGiftcardIcon fontSize="small" />
        </ListItemIcon>
        {"What's new"}
      </MenuItem>
      <MenuItem onClick={() => handleNavigation("/in-development")}>
        <ListItemIcon>
          <StarIcon fontSize="small" sx={{ color: "#FFC107" }} />
        </ListItemIcon>
        Upgrade to Pro
      </MenuItem>
      <MenuItem onClick={() => handleNavigation("/in-development")}>
        <ListItemIcon>
          <SyncIcon fontSize="small" />
        </ListItemIcon>
        Sync
      </MenuItem>
      <MenuItem onClick={onLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Log out
      </MenuItem>
    </Menu>
  );
};

export default NavbarMenu;
