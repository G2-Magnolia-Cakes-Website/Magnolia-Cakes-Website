import React, { useRef } from "react";
import FormInput from "Components/FormInput/FormInput";
import FormTextArea from "Components/FormTextArea/FormTextArea";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";

import "./ContactUsPage.css";

const ContactUsPage = ({ api }) => {
  const name = useRef(null);
  const mobile = useRef(null);
  const email = useRef(null);
  const message = useRef(null);

  return (
    <div className="contact-us-page">
      <div className="contact-us-card">
        <h1>Contact Us</h1>
        <p className="tiny-red-message">* indicates field is required</p>
        <form>
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
          <FormTextArea
            labelText="Message"
            inputName="message"
            inputType="text"
            placeholder="Enter Your Message"
            inputRef={message}
            isRequired={true}
          />
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

export default ContactUsPage;
