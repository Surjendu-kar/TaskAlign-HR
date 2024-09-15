"use client";
import { Stack, styled, Typography } from "@mui/material";

const MainContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

const Heading = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
});

function page() {
  return (
    <MainContainer>
      <Heading>Notifications</Heading>
    </MainContainer>
  );
}

export default page;
