import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { generateToken } from "../store/details/actions";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import "../index.css";
import { pesonalDetailsApi } from "../helpers/callApi";

const PersonalDetail = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDetails: {
      day: "",
      month: "",
      year: "",
    },
    number: "",
    email: "",
  });
  const [errorMessages, setErrorMessages] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiData = useSelector(
    (state) => state?.Details?.errorData?.response?.data
  );
  const loading = useSelector((state) => state?.Details?.loading);
  useEffect(() => {
    dispatch(generateToken());
  }, [dispatch]);

  useEffect(() => {
    if (apiData?.statusCode === 400) {
      setErrorMessages(apiData.message);
    }
    if (apiData?.statusCode === 500) {
      setErrorMessages(apiData.message);
    }
  }, [apiData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    let newFormData = { ...formData };

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = "Invalid email format";
      }
    }

    if (name === "number") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        errorMessage = "Invalid phone number format";
      }
    }

    if (errorMessage) {
      setErrorMessages(errorMessage);
    } else {
      setErrorMessages("");
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      newFormData[parent][child] = value;
    } else {
      newFormData[name] = value;
    }
    setFormData(newFormData);
  };
  const handleNext = (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z]+$/;
    if (
      !nameRegex.test(formData.firstName) ||
      !nameRegex.test(formData.lastName)
    ) {
      setErrorMessages("Please enter only alphabets in the name fields");
      return;
    }
    setStep(2);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await pesonalDetailsApi(formData);
      const { _id } = response.data.data;
      navigate(`/previous-address/${_id}`);
    } catch (error) {
      setErrorMessages("Phone Number or Email Address already present");
    }
  };
  return (
    <div className="container">
      {loading ? <Loader /> : null}
      {step === 1 && (
        <div>
          <h1 className="heading">Enter Your Personal Details</h1>
          <form onSubmit={handleNext}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="first Name"
              onChange={handleChange}
              required
            />
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="last Name"
              onChange={handleChange}
              required
            />
            <div className="dob-container">
              <label className="dob-title">Enter Your Date of Birth</label>
              <div className="dob-inputs">
                <input
                  type="number"
                  name="birthDetails.day"
                  placeholder="Day"
                  value={formData.birthDetails.day}
                  onChange={handleChange}
                  className="dob-input"
                />
                <input
                  type="number"
                  name="birthDetails.month"
                  placeholder="Month"
                  value={formData.birthDetails.month}
                  onChange={handleChange}
                  className="dob-input"
                />
                <input
                  type="number"
                  name="birthDetails.year"
                  placeholder="Year"
                  value={formData.birthDetails.year}
                  onChange={handleChange}
                  className="dob-input"
                />
              </div>
            </div>
            {errorMessages && (
              <Alert className="alertMessage">{errorMessages}</Alert>
            )}
            <button type="submit" className="nextButton">
              Next
            </button>
          </form>
        </div>
      )}
      {step === 2 && (
        <div>
          <h1 className="heading">Enter Your Contact Details</h1>
          <form onSubmit={handleSubmit}>
            <label>Number</label>
            <input
              type="tel"
              name="number"
              placeholder="Enter Number"
              value={formData.number}
              onChange={handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errorMessages && (
              <Alert className="alertMessage">{errorMessages}</Alert>
            )}
            <button type="submit" className="nextButton">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PersonalDetail;
