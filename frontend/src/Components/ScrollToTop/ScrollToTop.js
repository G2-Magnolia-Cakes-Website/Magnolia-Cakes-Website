import React, { useState } from "react";
import { ArrowUp } from "utils/icons";

import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
		in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      className="scroll-to-top"
      style={{ display: visible ? "flex" : "none" }}
    >
      <img
        className="arrow-up"
        src={ArrowUp}
        alt="Scroll To Top"
        onClick={scrollToTop}
      />
    </div>
  );
};

export default ScrollToTop;
