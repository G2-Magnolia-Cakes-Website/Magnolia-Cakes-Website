import React from "react";
import { SHOPDETAILS } from "utils/constants";
import magnoliaCakeLogo from "utils/Magnolia_Cake_logo.png";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./PageLayout.css";
import ScrollToTop from "Components/ScrollToTop/ScrollToTop";

const PageLayout = (props) => {
  const { api } = props;

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
      <ScrollToTop />
      <Footer api={api} />
    </div>
  );
};

export default PageLayout;
