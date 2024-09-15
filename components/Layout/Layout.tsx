"use client";
import React, { useState } from "react";
import { Box, Stack, styled } from "@mui/material";
import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

interface MainContentProps {
  isOpen: boolean;
}

const MainContainer = styled(Box)({
  display: "flex",
});

const MainContent = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<MainContentProps>(({ theme, isOpen }) => ({
  marginLeft: isOpen ? "280px" : "0",
  padding: "20px",
  transition: "margin-left 0.3s",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
}));

const ContentWrapper = styled(Stack)(({ theme }) => ({
  width: "65%",
  gap: theme.spacing(1),
  paddingTop: theme.spacing(4),
  alignItems: "flex-start",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

const OpenButton = styled("button")(({ theme }) => ({
  fontSize: "18px",
  cursor: "pointer",
  border: "none",
  padding: "5px",
  borderRadius: "5px",
  backgroundColor: "transparent",
  position: "fixed",
  top: "20px",
  left: "20px",
  zIndex: 1000,

  "&:hover": {
    backgroundColor: "#ebe8e89e",
  },
  [theme.breakpoints.down("sm")]: { fontSize: "20px" },
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MainContainer>
      <Navbar isOpen={isOpen} toggleNav={toggleNav} />
      <MainContent isOpen={isOpen}>
        {!isOpen && <OpenButton onClick={toggleNav}>&#9776;</OpenButton>}
        <ContentWrapper>{children}</ContentWrapper>
      </MainContent>
    </MainContainer>
  );
};

export default Layout;
