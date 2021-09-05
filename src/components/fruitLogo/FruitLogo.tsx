import React from "react";
import Lottie from "react-lottie";
import react_loading from "../../assets/fruit-loader.json";
import style from "./FruitLogo.module.scss";

const reactLogoAnimation = {
  loop: true,
  autoplay: true,
  animationData: react_loading,
  rendererSettings: {
    className: style.lottie,
  },
};

interface LoadingProps {
  width: number;
}

const ReactLogo: React.FC<LoadingProps> = ({ width }) => {
  return (
    <Lottie
      width={width}
      speed={1.5}
      options={reactLogoAnimation}
      isStopped={false}
      isPaused={false}
    />
  );
};

export default ReactLogo;
