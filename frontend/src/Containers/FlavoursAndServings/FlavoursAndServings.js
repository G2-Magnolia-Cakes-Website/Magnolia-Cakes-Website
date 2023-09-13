import React from "react";
import lists from "./flavours-fillings.json";
import List from "./List";

import "./FlavoursAndServings.css";

const FlavoursAndServings = () => {
  return (
    <div className="flavours-and-servings">
      <h1>Our Flavours</h1>
      <p className="description">
        Our focus extends beyond designing beautiful cakes; we are dedicated to
        using exclusively premium quality ingredients. This unwavering
        commitment guarantees that the cake for your special occasion not only
        looks stunning but also delivers an unparalleled taste experience,
        ensuring your celebration is truly remarkable.
      </p>
      <div className="flav-serv-lists">
        {lists.map((list) => (
          <List listTitle={list.title} listOptions={list.options} />
        ))}
      </div>
      <ul className="extra-info">
        <li>
          If you have any special flavour suggestions that are not currently on
          our menu, please feel free to contact us. We are always expanding and
          eager to introduce new flavours to our offerings. Your input is
          valuable to us, and we would love to hear your ideas for unique and
          exciting flavours.
        </li>
        <li>
          Please note that selecting our specially flavoured cakes will incur an
          additional cost, which will be determined in accordance with the size
          of the cake chosen.
        </li>
      </ul>
    </div>
  );
};

export default FlavoursAndServings;
