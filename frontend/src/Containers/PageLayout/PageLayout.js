import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ScrollToTop from "Components/ScrollToTop/ScrollToTop";
import "./PageLayout.css";

const PageLayout = (props) => {
  const { api } = props;

  return (
    <div className="layout">
      <Header
        api={props.api}
        isAuth={props.isAuth}
        setIsAuth={props.setIsAuth}
      />
      {props.children}
      <ScrollToTop />
      <Footer api={api} />
    </div>
  );
};

export default PageLayout;
