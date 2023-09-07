import React from "react";

import "./SelectionBox.css";

const SelectionBox = (props) => {
  const { selectLabel, options } = props;

  return (
    <label className="form-label">
      {selectLabel}
      <select className="form-select">
        {options.map((op) => (
          <option value={op}>{op}</option>
        ))}
      </select>
    </label>
  );
};

export default SelectionBox;
