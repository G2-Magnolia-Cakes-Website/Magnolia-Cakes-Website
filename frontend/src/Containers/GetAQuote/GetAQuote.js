import React, { useEffect, useRef, useState } from "react";
import { GetAQuoteBg } from "utils/get-a-quote";
import FormInput from "Components/FormInput/FormInput";
import SelectionBox from "Components/SelectionBox/SelectionBox";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";
import Dropzone from "Components/Dropzone/Dropzone";

import "./GetAQuote.css";
import { Cross } from "hamburger-react";

const GetAQuote = ({ api }) => {
  const flavoursList = [
    "Standard",
    "Chocolate",
    "Vanilla",
    "Marble Swirl",
    "Coffee",
    "Mocha",
    "Red Velvet",
    "Carrot & Cinnamon",
  ];

  const servesList = ["Coffee", "Standard"];

  const name = useRef(null);
  const mobile = useRef(null);
  const email = useRef(null);
  const servings = useRef(null);
  const [serves, setServes] = useState(servesList[0]);
  const date = useRef(null);
  const [flavour, setFlavour] = useState(flavoursList[0]);
  const extra = useRef(null);
  const message = useRef(null);
  const [files, setFiles] = useState([]);

  const sendEmailHandler = async (e) => {
    e.preventDefault();

    const bodyContent = {
      Name: name.current.value,
      Mobile: mobile.current.value,
      Email: email.current.value,
      Servings: servings.current.value,
      Serves: serves,
      Date: date.current.value,
      Flavour: flavour,
      Extra: extra.current.value,
      Message: message.current.value,
    };

    //     const body = `
    //       Name: ${name.current.value}
    // Mobile: ${mobile.current.value}
    // Email: ${email.current.value}
    // Servings: ${servings.current.value}
    // Serves: ${serves}
    // Date: ${date.current.value}
    // Flavour: ${flavour}
    // Extra: ${extra.current.value}
    // Message: ${message.current.value}
    //     `;

    const body = Object.keys(bodyContent)
      .map((key) => `${key}: ${bodyContent[key]}`)
      .join("\n");

    // const data = {
    //   email: email.current.value,
    //   subject: `${name.current.value} Requests a Quote`,
    //   message: body,
    // };

    const formData = new FormData();
    formData.append("email", email.current.value);
    formData.append("subject", `${name.current.value} Requests a Quote`);
    formData.append("message", body);
    if (files.length > 0) {
      files.map((f) => formData.append("file", f));
    }

    try {
      let res = await api.post("http://localhost:8000/api/contact/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        console.log("Form submit success.");
        alert("Form is submitted.");
      }
    } catch (err) {
      console.log("Form submit error.", err);
      alert("Form could not be submitted.");
    }
  };

  const removeFile = (file) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
    console.log("kim r", files);
  };

  const clearFiles = () => {
    setFiles([]);
  };

  console.log("kim", files);

  const filesList = files.map((file) => (
    <li className="file-item" key={file.name + files.indexOf(file)}>
      {file.name}
      <Cross
        toggled={true}
        onToggle={() => {
          removeFile(file);
        }}
      />
    </li>
  ));

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
              options={servesList}
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
              options={flavoursList}
              setOption={setFlavour}
            />
            <FormInput
              labelText="Extra"
              inputName="extra"
              inputType="text"
              placeholder="Acrylic Toppers"
              inputRef={extra}
            />
            <FormInput
              labelText="Message"
              inputName="message"
              inputType="text"
              placeholder="Enter Your Message"
              inputRef={message}
            />
          </div>
          <Dropzone setFiles={setFiles} />

          <RoseGoldButton
            buttonText="Submit"
            buttonType="submit"
            height="36px"
            margin="auto 0 8px"
          />

          {files.length > 0 && (
            <>
              <div className="file-list">
                <h4>Files:</h4>
                <ul className="files-list">{filesList}</ul>
              </div>
              <RoseGoldButton
                buttonText="Clear files"
                height="36px"
                margin="auto 0 8px"
                width="fit-content"
                onClick={clearFiles}
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default GetAQuote;
