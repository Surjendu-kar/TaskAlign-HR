"use client";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import { Box } from "@mui/material";
import loadingAnimation from "@/public/assets/loadingV4.json";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingAnimation animationData={loadingAnimation} />
    </Box>
  );
}

export default Loading;
