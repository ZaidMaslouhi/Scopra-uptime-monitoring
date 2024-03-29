import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/lotties/loading.json";

function LoadingAnimation() {
  return (
    <div className="w-full h-full absolute flex justify-center items-center bg-slate-200 ">
      <Lottie
        role="graphics-document"
        animationData={loadingAnimation}
        loop={true}
        className="w-64 h-64"
      />
    </div>
  );
}

export default LoadingAnimation;
