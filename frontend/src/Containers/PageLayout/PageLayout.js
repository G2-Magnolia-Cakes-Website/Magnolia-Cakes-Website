import React from "react";
import Header from "./Header/Header";
import "./PageLayout.css";

const PageLayout = (props) => {
  return (
    <div className="layout">
      <Header />
      {props.children}
    </div>
  );
};

export default PageLayout;
