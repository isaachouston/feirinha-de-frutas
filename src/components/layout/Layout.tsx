import React from "react";
import { Header } from "../header/Header";
export const Layout: React.FC = (props) => {
  return (
    <div id="container">
      <Header />
      {props.children}
    </div>
  );
};
