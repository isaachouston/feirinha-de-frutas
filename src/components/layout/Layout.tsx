import React from "react";
import { ToastContainer } from "react-toastify";
import { Header } from "../header/Header";
export const Layout: React.FC = (props) => {
  return (
    <div id="container">
      <Header />
      {props.children}
      <ToastContainer autoClose={5000}  />
    </div>
  );
};
