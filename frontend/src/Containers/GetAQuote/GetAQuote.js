import React from "react";
import { GetAQuoteBg } from "utils/get-a-quote";

import "./GetAQuote.css";
import FormInput from "Components/FormInput/FormInput";
import SelectionBox from "Components/SelectionBox/SelectionBox";

const GetAQuote = () => {
  const flavours = [
    "Standard",
    "Chocolate",
    "Vanilla",
    "Marble Swirl",
    "Coffee",
    "Mocha",
    "Red Velvet",
    "Carrot & Cinnamon",
  ];

  return (
    <div className="get-a-quote">
      <img className="cake-img" src={GetAQuoteBg} alt="cake" />
      <div className="get-a-quote-card white">
        <h2>Request a Quote</h2>
        <div className="grey-info-card">
          <p>
            For a custom quote on a cake not featured on our website, kindly
            fill in the details below with a description of your desired cake.
            We will promptly provide you with a personalizes quote based on your
            specification. We look forward to creating a unique and delightful
            cake for your special occasion.
          </p>
        </div>
        <p className="tiny-red-message">* indicates field is required</p>
        <form>
          <div className="double-column-div">
            <FormInput labelText="Name" inputName="name" inputType="text" />
            <FormInput labelText="Mobile" inputName="mobile" inputType="tel" />
          </div>
          <FormInput labelText="Email" inputName="email" inputType="email" />
          <div className="double-column-div">
            <FormInput
              labelText="Servings"
              inputName="servings"
              inputType="number"
            />
            <SelectionBox
              selectLabel="Coffee or standard serves"
              options={["Coffee", "Standard"]}
            />
            <FormInput
              labelText="Date of Event"
              inputName="date-of-event"
              inputType="date"
            />
            <SelectionBox selectLabel="Flavour" options={flavours} />
            <FormInput labelText="Extra" inputName="extra" inputType="text" />
            <FormInput
              labelText="Upload Your File"
              inputName="file"
              inputType="file"
            />
            <FormInput
              labelText="Message"
              inputName="message"
              inputType="text"
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetAQuote;
