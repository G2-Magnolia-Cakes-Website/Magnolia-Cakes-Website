import React from "react";
import "./FooterSection.css";

const FooterSection = (props) => {
  const { headerText } = props;
  return (
    <div className="footer-section">
      <h4>{headerText}</h4>
      {props.children}
    </div>
  );
};

export default FooterSection;
