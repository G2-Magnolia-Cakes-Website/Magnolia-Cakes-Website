import React, { useRef, useState } from "react";
import FormInput from "Components/FormInput/FormInput";
import FormTextArea from "Components/FormTextArea/FormTextArea";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";
import BarLoader from "react-spinners/BarLoader";

import "./ContactUsPage.css";

const ContactUsPage = ({ api }) => {
  const name = useRef(null);
  const mobile = useRef(null);
  const email = useRef(null);
  const message = useRef(null);

  // Loading
  const [loading, setLoading] = useState(false);

  const sendEmailHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bodyContent = {
      Name: name.current.value,
      Mobile: mobile.current.value,
      Email: email.current.value,
      Message: message.current.value,
    };

    const body = Object.keys(bodyContent)
      .map((key) => `${key}: ${bodyContent[key]}`)
      .join("\n");

    const data = {
      email: email.current.value,
      subject: `${name.current.value} Sends a Message via Contact Us`,
      message: body,
    };

    try {
      let res = await api.post("/api/contact/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        console.log("Form submit success.");
        alert("Form is submitted.");
        setLoading(false);
      }
    } catch (err) {
      console.log("Form submit error.", err);
      alert("Form could not be submitted.");
    }
  };

  return (
    <div className="contact-us-page">
      <div className="contact-us-card">
        <h1>Contact Us</h1>
        <p className="tiny-red-message">* indicates field is required</p>
        <form onSubmit={sendEmailHandler}>
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
          <br />
          <BarLoader
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
            width={"100%"}
          />
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
