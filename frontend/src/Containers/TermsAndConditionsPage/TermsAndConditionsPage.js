import React, { useState, useEffect } from "react";
import "./TermsAndConditions.css";

function Policy({ policyName, policyContent }) {
  const [openPolicy, setOpenPolicy] = useState(false);

  const handlePolicy = () => {
    setOpenPolicy(!openPolicy);
  };

  const renderPolicyContent = () => {
    return policyContent
      .split("\n")
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  };

  return (
    <div>
      <button className="Policy" onClick={handlePolicy}>
        {policyName.toUpperCase()}
        <span className="Symbol">{openPolicy ? "\u2193" : "\u2192"}</span>
      </button>

      {openPolicy && (
        <div className="PolicyContent">{renderPolicyContent()}</div>
      )}
    </div>
  );
}

function TermsAndConditionsPage({ api }) {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    api
      .get("/api/terms-and-conditions/")
      .then((response) => {
        setPolicies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  return (
    <div className="TermsAndConditionsContainer">
      <div className="TermsAndConditionsPage">
        <div>
          <h1 className="PageHeader">Terms & Conditions</h1>
          <p className="PageDescription">
            By accepting this cake agreement and paying a deposit, you agree to
            be subject to these Terms and Conditions.<br></br>
            <br></br>
            Please read the following Terms and Conditions carefully before
            placing your order with MAGNOLIA CAKES.<br></br>
            <br></br>
            By using the MAGNOLIA CAKES service, you agree to be bound by these
            Terms and Conditions<br></br>
            <br></br>
            We reserve the right to refuse the sale of goods or services or to
            cancel an order under certain circumstances.<br></br>
            <br></br>
            Please be aware that all photographs taken of your cakes prior to
            delivery remain property of MAGNOLIA CAKES.<br></br>
            <br></br>
          </p>
        </div>
        <div className="PolicyList">
          {policies.map((policy) => (
            <Policy
              key={policy.id}
              policyName={policy.policy_name}
              policyContent={policy.policy_content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditionsPage;
