import React, { useEffect, useState } from "react";
import {
  parseStringToArrayByComma,
  parseStringToParagraphsByNewline,
} from "utils/parseStringsToArray";
import List from "./List";
import ServingsTable from "Components/ServingsTable/ServingsTable";
import "./FlavoursAndServings.css";

const FlavoursAndServings = ({ api }) => {
  const [flavServLists, setFlavServLists] = useState([]);
  const [flavServInfo, setFlavServInfo] = useState({
    heading: "",
    description: "",
    extra_points: [],
  });
  const [servingsGuideInfo, setServingsGuideInfo] = useState({
    heading: "",
    paragraph: [],
  });
  const [servingsRoundCake, setServingsRoundCake] = useState([]);
  const [servingsSquareCake, setServingsSquareCake] = useState([]);

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

    api
      .get("/api/servings-guide-info/")
      .then((response) => {
        setServingsGuideInfo({
          heading: response.data.heading,
          paragraph: parseStringToParagraphsByNewline(response.data.paragraph),
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    api
      .get("/api/servings-round-cake/")
      .then((response) => {
        setServingsRoundCake(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    api
      .get("/api/servings-square-cake/")
      .then((response) => {
        setServingsSquareCake(response.data);
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
      {flavServInfo.extra_points.length > 0 && (
        <ul className="extra-info">
          {flavServInfo.extra_points.map((point) => (
            <li key={flavServInfo.extra_points.indexOf(point)}>{point}</li>
          ))}
        </ul>
      )}
      <h1>{servingsGuideInfo.heading}</h1>
      {servingsGuideInfo.paragraph.map((p) => (
        <p className="description">{p}</p>
      ))}
      <div className="servings-tables-wrapper">
        <ServingsTable data={servingsRoundCake} />
        <ServingsTable data={servingsSquareCake} />
      </div>
    </div>
  );
};

export default FlavoursAndServings;
