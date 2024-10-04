import React from "react";
import {
  Menu,
  MenuItem as MuiMenuItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
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
import NewReleasesIcon from "@mui/icons-material/NewReleases";

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
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <AddIcon fontSize="small" />
        </ListItemIcon>
        Add a team
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <AssessmentIcon fontSize="small" />
        </ListItemIcon>
        Activity log
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <PrintIcon fontSize="small" />
        </ListItemIcon>
        Print
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <MenuBookIcon fontSize="small" />
        </ListItemIcon>
        Resources
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <CardGiftcardIcon fontSize="small" />
        </ListItemIcon>
        {"What's new"}
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <StarIcon fontSize="small" sx={{ color: "#FFC107" }} />
        </ListItemIcon>
        Upgrade to Pro
      </MenuItem>
      <MenuItem onClick={onClose}>
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
