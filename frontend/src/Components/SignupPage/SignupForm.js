import { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "./TCPopup";
import React from "react";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";
import FormInput from "Components/FormInput/FormInput";
import BarLoader from "react-spinners/BarLoader";
import { ERRORMESSAGES } from "utils/constants";

export default function SignupForm({ api }) {
  // States for registration
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [agree, setAgree] = useState(false);

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [errorMessagePrint, setErrorMessage] = useState(
    ERRORMESSAGES.DEFAULT_SIGNUP_ERROR
  );

  const [buttonPopup, setButtonPopup] = useState(false);

  // Loading
  const [loading, setLoading] = useState(false);

  // Handling the username change
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };

  // Handling the username change
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword1 = (e) => {
    setPassword1(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
    setSubmitted(false);
  };

  const checkboxHandler = () => {
    setAgree(!agree);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password1 === "" ||
      password2 === ""
    ) {
      setErrorMessage(ERRORMESSAGES.DEFAULT_SIGNUP_ERROR);
      setError(true);
    } else if (!agree) {
      setErrorMessage(ERRORMESSAGES.TERMS_CONDITIONS_UNCHECKED_ERROR);
      setError(true);
    } else {
      // Send API msg to backend
      try {
        const user = {
          username: email,
          first_name: firstname,
          last_name: lastname,
          password1: password1,
          password2: password2,
        };

        let res = await api.post("/api/register/", user, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (res.status === 201) {
          setPassword1("");
          setPassword2("");

          setError(false);
          setErrorMessage(ERRORMESSAGES.DEFAULT_SIGNUP_ERROR);
          setSubmitted(true);
          console.log(res);
        } else {
          if (res.data["password1"]) {
            setErrorMessage(res.data["password1"]);
          } else if (res.data["password2"]) {
            setErrorMessage(res.data["password2"]);
          } else if (res.data["username"]) {
            setErrorMessage(res.data["username"]);
          } else if (res.data["first_name"]) {
            setErrorMessage(res.data["first_name"]);
          } else if (res.data["last_name"]) {
            setErrorMessage(res.data["last_name"]);
          } else if (res.data["message"]) {
            setErrorMessage(res.data["message"]);
          } else {
            setErrorMessage("Error: Something went wrong!");
          }
          setSubmitted(false);
          setError(true);
          console.log(res);
        }
      } catch (err) {
        console.log(err);
        if (err.response.data["password1"]) {
          setErrorMessage(err.response.data["password1"]);
        } else if (err.response.data["password2"]) {
          setErrorMessage(err.response.data["password2"]);
        } else if (err.response.data["username"]) {
          setErrorMessage(err.response.data["username"]);
        } else if (err.response.data["first_name"]) {
          setErrorMessage(err.response.data["first_name"]);
        } else if (err.response.data["last_name"]) {
          setErrorMessage(err.response.data["last_name"]);
        } else if (err.response.data["message"]) {
          setErrorMessage(err.response.data["message"]);
        } else {
          setErrorMessage("Error: Something went wrong!");
        }
        setError(true);
        setSubmitted(false);
      }
    }
    setLoading(false);
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <p className="msgs">
          You have successfully registered, {firstname} {lastname}! Please click
          the link in your email, {email}, for verification.
        </p>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <div className="msgs">{errorMessagePrint}</div>
      </div>
    );
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleFirstName}
          value={firstname}
          labelText="First Name"
          inputName="firstname"
          inputType="text"
          placeholder="First Name"
        />
        <FormInput
          onChange={handleLastName}
          value={lastname}
          labelText="Last Name"
          inputName="lastname"
          inputType="text"
          placeholder="Last Name"
        />
        <FormInput
          onChange={handleEmail}
          value={email}
          labelText="Email"
          inputName="email"
          inputType="email"
          placeholder="Email"
        />

        <FormInput
          onChange={handlePassword1}
          value={password1}
          labelText="Password"
          inputName="password1"
          inputType="password"
          placeholder="Password"
        />
        <FormInput
          onChange={handlePassword2}
          value={password2}
          inputName="password2"
          inputType="password"
          placeholder="Confirm Password"
        />

        <div className="terms-conditions-check">
          <label htmlFor="agree" className="label">
            <input
              type="checkbox"
              className="checkbox"
              id="agree"
              onChange={checkboxHandler}
            />
            <p>
              I agree to the{" "}
              <button
                type="button"
                className="terms-and-conditions"
                onClick={() => setButtonPopup(true)}
              >
                <b>Terms and Conditions</b>
              </button>
            </p>
          </label>
        </div>
        <RoseGoldButton
          buttonText="Create Account"
          buttonType="submit"
          height="36px"
          margin="auto 0 8px"
        />

        <Popup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          api={api}
          position="right center"
        ></Popup>

        <div className="signup-question">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Log in
          </Link>
        </div>

        <br />
        <BarLoader
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
          width={"100%"}
        />

        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
      </form>
    </div>
  );
}
