import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";
import GreyButton from "Components/GreyButton/GreyButton";
import { Cross } from "hamburger-react";
import { clearLocalStorage } from 'utils/LocalStorage/LocalStorageUtils';

import "./LogoutPopup.css";

function LogoutPopup(props) {
  const navigate = useNavigate();

  // Loading
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Send API msg to backend
    try {
      const token = {
        refresh_token: localStorage.getItem("refresh_token"),
      };

      let res = await props.api.post("/api/logout/", token, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        withCredentials: true,
      });

      if (res.status === 205) {

        // Remove credentials in local storage
        clearLocalStorage();

        props.api.defaults.headers.common["Authorization"] = null;

        props.setTrigger(false);

        setLoading(false);

        navigate("/");
        navigate(0);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return props.trigger ? (
    <div className="logout-popup">
      <div className="popup-inner">
        <div className="cross">
          <Cross toggled={true} onToggle={() => props.setTrigger(false)} />
        </div>
        Are you sure you want to logout?
        <div className="cancel-yes-popup-buttons">
          <GreyButton
            buttonText="Cancel"
            onClick={() => props.setTrigger(false)}
            width="fit-content"
            margin="15px 10px"
            padding="5px 25px"
          />
          <RoseGoldButton
            buttonText="Yes"
            onClick={handleSubmit}
            width="fit-content"
            margin="15px 10px"
            padding="5px 25px"
          />
        </div>
        <BarLoader
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
          width={"100%"}
        />
      </div>
    </div>
  ) : (
    ""
  );
}

export default LogoutPopup;
