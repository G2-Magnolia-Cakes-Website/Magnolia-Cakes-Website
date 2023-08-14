import React from "react";
import Header from "./Header/Header";
import "./PageLayout.css";
import Footer from "./Footer/Footer";

const PageLayout = (props) => {
  return (
    <div className="layout">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default PageLayout;
