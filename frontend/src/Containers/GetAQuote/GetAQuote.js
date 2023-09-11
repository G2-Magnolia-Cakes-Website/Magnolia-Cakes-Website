import React, { useRef, useState } from "react";
import { GetAQuoteBg } from "utils/get-a-quote";
import FormInput from "Components/FormInput/FormInput";
import SelectionBox from "Components/SelectionBox/SelectionBox";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";
import Dropzone from "Components/Dropzone/Dropzone";

import "./GetAQuote.css";

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

  const name = useRef("");
  const mobile = useRef("");
  const email = useRef("");
  const servings = useRef(0);
  const [serves, setServes] = useState(null);
  const date = useRef(null);
  const [flavour, setFlavour] = useState(null);
  const extra = useRef(null);
  const message = useRef(null);

  const sendEmailHandler = (e) => {
    e.preventDefault();
    alert("Form is submitted.");
  };

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
        <form
          onSubmit={sendEmailHandler}
          action="mailto:kimt12531@gmail.com"
          method="POST"
          encType="multipart/form-data"
        >
          <div className="double-column-div">
            <FormInput
              labelText="Name"
              inputName="name"
              inputType="text"
              isRequired
              placeholder="Enter Name"
              inputRef={name}
            />

            <FormInput
              labelText="Mobile"
              inputName="mobile"
              inputType="tel"
              placeholder="Enter Mobile"
              inputRef={mobile}
            />
          </div>
          <FormInput
            labelText="Email"
            inputName="email"
            inputType="email"
            isRequired
            placeholder="Enter Your Email"
            inputRef={email}
          />
          <div className="double-column-div">
            <FormInput
              labelText="Servings"
              inputName="servings"
              inputType="number"
              isRequired
              placeholder="E.g., 12"
              inputRef={servings}
            />
            <SelectionBox
              selectLabel="Coffee or standard serves"
              options={["Coffee", "Standard"]}
              setOption={setServes}
            />
            <FormInput
              labelText="Date of Event"
              inputName="date-of-event"
              inputType="date"
              inputRef={date}
            />
            <SelectionBox
              selectLabel="Flavour"
              options={flavours}
              setOption={setFlavour}
            />
            <FormInput
              labelText="Extra"
              inputName="extra"
              inputType="text"
              placeholder="Acrylic Toppers"
            />
            <FormInput
              labelText="Message"
              inputName="message"
              inputType="text"
              placeholder="Enter Your Message"
            />
          </div>
          <Dropzone />
          <RoseGoldButton
            buttonText="Submit"
            buttonType="submit"
            height="36px"
            margin="auto 0 8px"
          />
        </form>
      </div>
    </div>
  );
};

export default GetAQuote;
