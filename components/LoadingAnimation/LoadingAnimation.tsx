import React from "react";
import Lottie from "lottie-react";

interface LoadingAnimationProps {
  animationData: unknown;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  animationData,
}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 30, height: 30 }}
      />
    </div>
  );
};

export default LoadingAnimation;
