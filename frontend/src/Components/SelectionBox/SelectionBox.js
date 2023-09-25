import React from "react";

import "./SelectionBox.css";

const SelectionBox = (props) => {
  const { selectLabel, options, setOption } = props;

  const onChangeHandler = (e) => {
    setOption(e.target.value);
  };

  return (
    <label className="form-label">
      {selectLabel}
      <select className="form-select" onChange={onChangeHandler}>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectionBox;
