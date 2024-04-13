import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css";
import { previousAddressApi } from "../helpers/callApi";

const PreviousAddress = () => {
  const [addresses, setAddresses] = useState([
    { addressLine1: "", addressLine2: "", addressLine3: "" },
    { addressLine1: "", addressLine2: "", addressLine3: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  const addAddress = () => {
    setAddresses([
      ...addresses,
      { addressLine1: "", addressLine2: "", addressLine3: "" },
    ]);
  };

  const removeAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await previousAddressApi(addresses, id);
      navigate(`/`);
    } catch (error) {
      setErrorMessage("Error submitting personal details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Enter Your Previous Address</h1>
      <form onSubmit={handleSubmit} className="address-form">
        {addresses.map((address, index) => (
          <div key={index}>
            <h3>Previous Address {index + 1}</h3>
            <input
              type="text"
              placeholder="Address Line 1"
              value={address.addressLine1}
              onChange={(e) =>
                handleAddressChange(index, "addressLine1", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={address.addressLine2}
              onChange={(e) =>
                handleAddressChange(index, "addressLine2", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Address Line 3"
              value={address.addressLine3}
              onChange={(e) =>
                handleAddressChange(index, "addressLine3", e.target.value)
              }
            />
            {index > 0 && (
              <div className="button-row">
                <button
                  type="button"
                  onClick={() => removeAddress(index)}
                  className="addbutton"
                >
                  Remove Address
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="button-row">
          <button
            type="button"
            onClick={addAddress}
            className="addbutton"
            disabled={isSubmitting}
          >
            Add Another Address
          </button>
          <button type="submit" className="submitAdd" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
        {errorMessage && <div className="alertMessage">{errorMessage}</div>}
      </form>
    </div>
  );
};
export default PreviousAddress;
