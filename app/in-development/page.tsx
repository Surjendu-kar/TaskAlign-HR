"use client";
import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "@/public/assets/development.json";

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
      <Typography sx={{ marginTop: "-3rem", color: "inherit" }}>
        Currently in development phase
      </Typography>
    </Box>
  );
}

export default InDevelopment;
