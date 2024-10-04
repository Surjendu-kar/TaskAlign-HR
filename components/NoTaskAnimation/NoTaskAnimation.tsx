import Lottie from "lottie-react";
import noTaskAnimation from "@/public/assets/noTask.json";
import { Stack } from "@mui/material";

const NoTaskAnimation = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="60vh">
      <Lottie
        animationData={noTaskAnimation}
        loop={true}
        autoplay={true}
        style={{ width: 400, height: 400 }}
      />
    </Stack>
  );
};

export default NoTaskAnimation;
