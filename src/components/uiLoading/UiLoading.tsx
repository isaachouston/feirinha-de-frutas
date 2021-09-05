import { Dialog } from "@material-ui/core";
import React from "react";
import FruitLogo from "../fruitLogo/FruitLogo";
import style from "./UiLoading.module.scss";

interface LoadingProps {
  isLoading: boolean;
}

const UiLoading: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <Dialog
      open={isLoading}
      PaperProps={{
        className: style.dialog,
      }}
    >
      <FruitLogo width={350} />
    </Dialog>
  );
};

export default UiLoading;
