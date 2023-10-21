import React, { useEffect, useState } from "react";
import { Cross } from "hamburger-react";
import "./TCPopup.css";

function Popup(props) {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    // Make a GET request using the passed api instance
    props.api
      .get("/api/terms-and-conditions/")
      .then((response) => {
        // Set the retrieved content in the state
        setPolicies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [props.api]);

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="cross">
          <Cross toggled={true} onToggle={() => props.setTrigger(false)} />
        </div>
        <h2>Terms & Conditions</h2>
        <p>
          By accepting this cake agreement and paying a deposit, you agree to be
          subject to these Terms and Conditions.<br></br>
          Please read the following Terms and Conditions carefully before
          placing your order with MAGNOLIA CAKES.<br></br>
          By using the MAGNOLIA CAKES service, you agree to be bound by these
          Terms and Conditions<br></br>
          We reserve the right to refuse the sale of goods or services or to
          cancel an order under certain circumstances.<br></br>
          Please be aware that all photographs taken of your cakes prior to
          delivery remain property of MAGNOLIA CAKES.<br></br>
        </p>
        {policies.map((policy) => (
          <div key={policy.id}>
            <h2>{policy.policy_name}</h2>
            {policy.policy_content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
