"use client";
import React, { useState, useEffect } from "react";
import { Box, Stack, styled, CircularProgress } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import loadingAnimation from "@/public/assets/loadingV4.json";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

interface LayoutProps {
  children: React.ReactNode;
}

interface ContentWrapperProps {
  isAuthenticated: boolean;
}
interface MainContentProps extends ContentWrapperProps {
  isOpen: boolean;
}

const MainContainer = styled(Box)({
  display: "flex",
});

const MainContent = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isOpen" && prop !== "isAuthenticated",
})<MainContentProps>(({ isOpen, isAuthenticated, theme }) => ({
  marginLeft: isOpen ? "280px" : "0",
  padding: isAuthenticated ? "16px" : 0,
  height: isAuthenticated ? "auto" : "100vh",
  transition: "margin-left 0.3s",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

const ContentWrapper = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isAuthenticated",
})<ContentWrapperProps>(({ theme, isAuthenticated }) => ({
  width: isAuthenticated ? "65%" : "100%",
  gap: theme.spacing(1),
  paddingTop: isAuthenticated ? theme.spacing(4) : theme.spacing(0),
  alignItems: isAuthenticated ? "flex-start" : "center",
  transition: "width 0.3s",

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
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/login") {
      router.push("/login");
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return <LoadingAnimation animationData={loadingAnimation} />;
  }

  if (!session && pathname !== "/login") {
    return null;
  }

  const isAuthenticated = !!session;

  return (
    <MainContainer>
      {session && <Navbar isOpen={isOpen} toggleNav={toggleNav} />}
      <MainContent
        isAuthenticated={isAuthenticated}
        isOpen={isOpen && !!session}
      >
        {!isOpen && session && (
          <OpenButton onClick={toggleNav}>&#9776;</OpenButton>
        )}
        <ContentWrapper isAuthenticated={isAuthenticated}>
          {children}
        </ContentWrapper>
      </MainContent>
    </MainContainer>
  );
};

export default Layout;
