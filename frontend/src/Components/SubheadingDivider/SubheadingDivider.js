import React from "react";

import "./SubheadingDivider.css";

const SubheadingDivider = (props) => {
  const { subheadingText } = props;

  return (
    <div className="subheading-div">
      <h1 className="subheading-text">{subheadingText}</h1>
    </div>
  );
};

export default SubheadingDivider;
