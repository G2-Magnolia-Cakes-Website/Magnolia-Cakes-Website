import React from "react";

import "./List.css";

const List = (props) => {
  const { listTitle, listOptions } = props;

  return (
    <div className="list-wrapper">
      <h4>{listTitle}</h4>
      <ul>
        {listOptions.map((op) => (
          <li>{op}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
