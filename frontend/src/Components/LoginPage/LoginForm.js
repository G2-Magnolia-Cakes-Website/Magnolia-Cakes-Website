import FormInput from "Components/FormInput/FormInput";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";
import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import { AuthContext } from "../../AuthContext";
import { clearLocalStorage } from 'utils/LocalStorage/LocalStorageUtils';

export default function LoginForm({ api, handleLoginSuccess }) {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [error, setError] = useState(false);
  const defaultErrorMessage =
    "Login failed! Please enter a correct username and password. Note that both fields may be case-sensitive.";
  const [errorMessagePrint, setErrorMessage] = useState(defaultErrorMessage);

  // Loading
  const [loading, setLoading] = useState(false);

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value.toLowerCase());
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage(defaultErrorMessage);
      setError(true);
    } else {
      // Send API msg to backend
      try {
        setLoading(true);

        const user = {
          username: email,
          password: password,
        };

        let res = await api.post("/api/token/", user, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          setPassword("");
          setEmail("");
          setError(false);
          setErrorMessage(defaultErrorMessage);

          // Remove credentials in local storage
          clearLocalStorage();

          // Initialize the access & refresh token in localstorage.
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.access}`;

          getUserDetails();

          getCustomerID();

          handleLoginSuccess(); // Call the callback function to update the isAuth state in the App component

          navigate("/");
        } else {
          if (res.data["detail"]) {
            setErrorMessage(res.data["detail"]);
          } else if (res.data["message"]) {
            setErrorMessage(res.data["message"]);
          } else {
            setErrorMessage(defaultErrorMessage);
          }
          setError(true);
          console.log(res);
        }
      } catch (err) {
        console.log(err);
        if (err.response.data["detail"]) {
          setErrorMessage(err.response.data["detail"]);
        } else if (err.response.data["message"]) {
          setErrorMessage(err.response.data["message"]);
        } else {
          setErrorMessage(defaultErrorMessage);
        }
        setError(true);
      }
    }
    setLoading(false);
  };

  const getUserDetails = async (e) => {
    try {
      // get user

      let res = await api.get("/api/user/", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("first_name", res.data.first_name);
        localStorage.setItem("last_name", res.data.last_name);
        setUser(res.data);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCustomerID = async (e) => {
    try {
      // get user

      let res = await api.get("/api/user/customer_id/", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        localStorage.setItem("customer_id", res.data.customer_id);
      } else {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
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
    <form onSubmit={handleSubmit} className="login-form">
      <FormInput
        onChange={handleEmail}
        value={email}
        labelText="Email"
        inputName="email"
        inputType="email"
        placeholder="Email"
        autoCapitalize="none"
      />

      <FormInput
        onChange={handlePassword}
        value={password}
        labelText="Password"
        inputName="password"
        inputType="password"
        placeholder="Password"
      />

      <div className="signup-question">
        <Link to="/forgot-password" className="signup-link">
          Forgot your password?
        </Link>
      </div>

      <RoseGoldButton
        buttonText="Login"
        buttonType="submit"
        height="36px"
        margin="auto 0 8px"
      />

      <div className="signup-question">
        Don't have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign up for free
        </Link>
      </div>

      <br />
      <BarLoader
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
        width={"100%"}
      />
      <div className="messages">{errorMessage()}</div>
    </form>
  );
}
