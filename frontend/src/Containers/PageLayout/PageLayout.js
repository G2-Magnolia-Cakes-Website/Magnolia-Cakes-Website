import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import magnoliaCakeLogo from "../../utils/Magnolia_Cake_logo.png";
import "./PageLayout.css";
import { SHOPDETAILS } from "../../utils/constants";

const PageLayout = (props) => {
  const logo = (
    <img className="logo" src={magnoliaCakeLogo} alt="Magnolia Cake Logo" />
  );

  return (
    <div className="layout">
      <div className="business-name-wrapper">
        {logo}
        <h1 className="business-name">{SHOPDETAILS.MAGNOLIA_CAKE_SHOP_NAME}</h1>
      </div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default PageLayout;
