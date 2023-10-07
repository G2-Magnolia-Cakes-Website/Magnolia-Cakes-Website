import React, { useEffect, useRef, useState } from "react";
import { GetAQuoteBg } from "utils/get-a-quote";
import FormInput from "Components/FormInput/FormInput";
import SelectionBox from "Components/SelectionBox/SelectionBox";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";
import Dropzone from "Components/Dropzone/Dropzone";

import "./GetAQuote.css";
import { Cross } from "hamburger-react";
import FormTextArea from "Components/FormTextArea/FormTextArea";
import { CAKETYPES, FLAVSERVLISTTYPE } from "utils/constants";
import { parseStringToArrayByComma } from "utils/parseStringsToArray";
import BarLoader from "react-spinners/BarLoader";
import { useNavigate } from 'react-router-dom';

const GetAQuote = ({ api }) => {
  const servesList = ["Coffee", "Standard"];

  const cakeTypesList = [CAKETYPES.CAKE, CAKETYPES.CUPCAKE];
  const [flavoursList, setFlavoursList] = useState(["Standard"]);
  const [fillingsList, setFillingsList] = useState(["Standard"]);

  const name = useRef(null);
  const mobile = useRef(null);
  const email = useRef(null);
  const [cakeType, setCakeType] = useState(cakeTypesList[0]);
  const servings = useRef(null);
  const [serves, setServes] = useState(
    cakeType === CAKETYPES.CAKE ? servesList[0] : null
  );
  const date = useRef(null);
  const [flavour, setFlavour] = useState(flavoursList[0]);
  const [filling, setFilling] = useState(fillingsList[0]);
  const extra = useRef(null);
  const message = useRef(null);
  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sendEmailHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bodyContent = {
      Name: name.current.value,
      Mobile: mobile.current.value,
      Email: email.current.value,
      "Product Type": cakeType,
      "Servings/Amount": servings.current.value,
      Serves: cakeType === CAKETYPES.CAKE ? serves : "N/A",
      "Date of Event": date.current.value,
      Flavour: flavour,
      Filling: filling,
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

    const contactFormData = new FormData();
    contactFormData.append("email", email.current.value);
    contactFormData.append("subject", `${name.current.value} Requests a Quote`);
    contactFormData.append("message", body);
    if (files.length > 0) {
      files.map((f) => contactFormData.append("file", f));
    }

    try {
      let res = await api.post("/api/contact/", contactFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {

        alert("Thanks for reaching out to us. We will get back to you soon!");

         // Navigate to the homepage after a successful form submission
         navigate('/');
      }
    } catch (err) {
      console.log("Form submit error.", err);
      alert("Could not submit right now, please try again later.");
    }

    // Convert to django date value
    const dateValue = date.current.value;
    const formattedDate = dateValue ? new Date(dateValue).toISOString().split('T')[0] : null;

    const quoteData = {
      name: name.current.value,
      mobile: mobile.current.value|| null,
      email: email.current.value,
      product_type: cakeType,
      servings_or_amount: servings.current.value,
      serves: cakeType === CAKETYPES.CAKE ? serves : "N/A",
      date_of_event: formattedDate,
      flavour: flavour,
      filling: filling,
    };

    try {
      let res = await api.post("/api/log-quote/", quoteData);

      if (res.status === 200) {
        console.log("Log quote success.");
      }
    } catch (err) {
      console.log("Log quote error.", err);
    }

    setLoading(false);
  };

  const removeFile = (file) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const clearFiles = () => {
    setFiles([]);
  };

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

  useEffect(() => {
    // Make a GET request using the passed api instance
    api
      .get("/api/flavours-and-servings/")
      .then((response) => {
        // Set the retrieved content in the state
        const flavServLists = response.data.sort((a, b) => {
          return a.id - b.id;
        });

        const flavoursListTemp = [];
        const fillingsListTemp = [];

        flavServLists
          .filter((list) => list.type === FLAVSERVLISTTYPE.FLAVOURS)
          .map((list) =>
            flavoursListTemp.push(...parseStringToArrayByComma(list.list))
          );
        setFlavoursList([...flavoursList, ...flavoursListTemp]);

        flavServLists
          .filter((list) => list.type === FLAVSERVLISTTYPE.FILLINGS)
          .map((list) =>
            fillingsListTemp.push(...parseStringToArrayByComma(list.list))
          );
        setFillingsList([...fillingsList, ...fillingsListTemp]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  // Get the current date in the format 'YYYY-MM-DD'
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
          <SelectionBox
            selectLabel="Cake or Cupcakes?"
            options={cakeTypesList}
            setOption={setCakeType}
          />
          <div className="double-column-div">
            <FormInput
              labelText={
                cakeType === CAKETYPES.CUPCAKE
                  ? "Amount of cupcakes"
                  : "Servings"
              }
              inputName="servings"
              inputType="number"
              isRequired
              placeholder="E.g., 12"
              inputRef={servings}
              min="12"
            />
            {cakeType === CAKETYPES.CAKE && (
              <SelectionBox
                selectLabel="Coffee or Standard serves?"
                options={servesList}
                setOption={setServes}
              />
            )}
            <SelectionBox
              selectLabel="Flavour"
              options={flavoursList.length > 0 ? flavoursList : ["N/A"]}
              setOption={setFlavour}
            />
            <SelectionBox
              selectLabel="Filling"
              options={fillingsList.length > 0 ? fillingsList : ["N/A"]}
              setOption={setFilling}
            />
            <FormInput
              labelText="Date of Event"
              inputName="date-of-event"
              inputType="date"
              inputRef={date}
              min={getCurrentDate()}
            />
          </div>

          <FormTextArea
            labelText="Extra"
            inputName="extra"
            inputType="text"
            placeholder="Acrylic Toppers"
            inputRef={extra}
          />

          <FormTextArea
            labelText="Message"
            inputName="message"
            inputType="text"
            placeholder="Enter Your Message"
            inputRef={message}
          />

          <Dropzone setFiles={setFiles} />

          <RoseGoldButton
            buttonText="Submit"
            buttonType="submit"
            height="36px"
            margin="auto 0 8px"
            disabled={loading}
          />
          <BarLoader
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
          width={"100%"}
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