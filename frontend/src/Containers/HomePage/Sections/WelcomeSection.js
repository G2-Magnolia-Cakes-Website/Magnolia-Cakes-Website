import React from "react";
import welcomePhoto from "utils/welcome-photo.jpg";
import "./WelcomeSection.css";

const WelcomeSection = () => {
  return (
    <div className="welcome-section">
      <h2>
        Experience the Magic of Our Melbourne-Based Cake Studio, Where Artistry
        and the Love for Cake Making Harmoniously Combine
      </h2>
      <div className="welcome-body">
        <p>
          Welcome to Magnolia Cakes & Cupcakes, where we take great pride in
          meticulously crafting custom made cakes for every occasion. With our
          artistic expertise and unwavering commitment, we ensure that each cake
          is freshly made and designed with utmost precision. Our focus lies not
          only on creating visually stunning masterpieces but also on delivering
          an exceptional taste experience. Whether it's a birthday celebration,
          wedding ceremony, or any special event, our dedication remains
          unwavering in providing custom cakes and cupcakes that surpass all
          expectations.
        </p>
        <img className="welcome-cake" src={welcomePhoto} alt="welcome cake" />
      </div>
    </div>
  );
};

export default WelcomeSection;
