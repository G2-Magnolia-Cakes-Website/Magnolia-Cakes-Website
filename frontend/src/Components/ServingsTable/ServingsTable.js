import React from "react";
import "./ServingsTable.css";

const ServingsTable = (props) => {
  const { data, heading } = props;

  return (
    <div>
      <h4 className="servings-table-heading">{heading}</h4>
      <table className="servings-table">
        <tr>
          <th>Size</th>
          <th>Standard Serves</th>
          <th>Coffee Serves</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.size_in_inches}"</td>
              <td>{val.standard_serves}</td>
              <td>{val.coffee_serves}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ServingsTable;
