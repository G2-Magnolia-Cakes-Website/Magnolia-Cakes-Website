import React, { useEffect, useState } from "react";
import List from "./List";

import "./FlavoursAndServings.css";
import { parseStringToArrayByComma } from "utils/parseStringsToArray";

const FlavoursAndServings = ({ api }) => {
  const [flavServLists, setFlavServLists] = useState([]);
  const [flavServInfo, setFlavServInfo] = useState({
    heading: "",
    description: "",
    extra_points: [],
  });

  useEffect(() => {
    // Make a GET request using the passed api instance
    api
      .get("/api/flavours-and-servings/")
      .then((response) => {
        // Set the retrieved content in the state
        setFlavServLists(
          response.data.sort((a, b) => {
            return a.id - b.id;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    api
      .get("/api/flavours-and-servings-info/")
      .then((response) => {
        setFlavServInfo({
          heading: response.data.heading,
          description: response.data.description,
          extra_points: parseStringToArrayByComma(response.data.extra_points),
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  return (
    <div className="flavours-and-servings">
      <h1>{flavServInfo.heading}</h1>
      <p className="description">{flavServInfo.description}</p>
      <div className="flav-serv-lists">
        {flavServLists.map((flavServList) => (
          <List
            key={flavServList.title}
            listTitle={flavServList.title}
            listOptions={flavServList.list}
          />
        ))}
      </div>
      <ul className="extra-info">
        {flavServInfo.extra_points.map((point) => (
          <li key={flavServInfo.extra_points.indexOf(point)}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default FlavoursAndServings;
