import React from "react";
import cakePop from "utils/cake_pop_transparent.png";

const IntroQuote = (props) => {
  const { quote } = props;

  return (
    <div className="quote-wrapper2">
      {quote.map((paragraph) => (
        <p className="quote">{paragraph}</p>
      ))}

      <img src={cakePop} alt="Cake Pop" className="cake-pop" />
    </div>
  );
};

export default IntroQuote;
