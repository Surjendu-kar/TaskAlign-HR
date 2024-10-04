"use client";
import { Box, styled, Typography } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "@/public/assets/development.json";

const Text = styled(Typography)(({ theme }) => ({
  marginTop: "-3rem",
  color: "inherit",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

function InDevelopment() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{
          width: 300,
          height: 300,
        }}
      />
      <Text>Currently in development phase</Text>
    </Box>
  );
}

export default InDevelopment;
