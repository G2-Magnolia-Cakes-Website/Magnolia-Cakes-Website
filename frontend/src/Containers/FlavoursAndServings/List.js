import React from "react";

import "./List.css";

const List = (props) => {
  const { listTitle, listOptions } = props;

  const listOptionsArray = listOptions.split(", ");

  return (
    <div className="list-wrapper">
      <h4>{listTitle}</h4>
      <ul>
        {listOptionsArray.map((op) => (
          <li key={op}>{op}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
