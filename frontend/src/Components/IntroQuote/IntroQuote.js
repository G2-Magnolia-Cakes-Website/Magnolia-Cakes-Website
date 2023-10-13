import React from "react";
import cakePop from "utils/cake_pop_transparent.png";
import magnoliaFlower from "utils/magnolia_transparent.png";
import { SHOPDETAILS } from "utils/constants";

import "./IntroQuote.css";

const IntroQuote = (props) => {
  const { quote } = props;

  return (
    <div className="quote-wrapper2">
      <h1 className="business-name">{SHOPDETAILS.MAGNOLIA_CAKE_SHOP_NAME}</h1>
      <div className="quote-p-wrapper">
        {quote.map((paragraph) => (
          <p className="quote">{paragraph}</p>
        ))}
      </div>
      <img src={magnoliaFlower} alt="Cake Pop" className="cake-pop" />
    </div>
  );
};

export default IntroQuote;
