import React from "react";
import Lottie from "lottie-react";
import animationData from "../../animations/successfully.json";

const SuccessfullyAnimation: React.FC = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  );
};

export default SuccessfullyAnimation;
