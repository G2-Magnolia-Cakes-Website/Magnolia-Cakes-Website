import React from "react";
import magnoliaFlower from "utils/magnolia_transparent.png";

import "./IntroQuote.css";

const IntroQuote = (props) => {
  const { quote } = props;

  return (
    <div className="quote-wrapper2">
      <h1 className="business-name">Magnolia</h1>
      <h1 className="business-name">Cakes & Cupcakes</h1>
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