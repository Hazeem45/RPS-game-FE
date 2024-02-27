import React, {useEffect, useState} from "react";
import "./styles/biodataForm.css";
import SelectForm from "../fragments/SelectForm";
import InputForm from "../fragments/InputForm";
import Button from "../elements/Button";
import {useNavigate} from "react-router-dom";

function BiodataForm() {
  const navigate = useNavigate();
  const genders = ["--", "Male", "Female", "Other"];
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    address: "",
    gender: "",
    date: "",
  });
  const [buttonStyle, setButtonStyle] = useState({
    background: "#333",
    boxShadow: "none",
    color: "white",
  });

  const handleChange = (e) => {
    // setValues({...values, [e.target.name]: e.target.value});
    const {name, value} = e.target;
    if (name === "gender" && value === "--") {
      setValues({...values, gender: ""});
    } else {
      setValues({...values, [name]: value});
    }
  };

  useEffect(() => {
    // Check if any value in values is not empty
    const isEmpty = Object.values(values).some((value) => value.trim() !== "");
    // Update buttonStyle based on isEmpty
    setButtonStyle(
      isEmpty
        ? null
        : {
            background: "#333",
            boxShadow: "none",
            color: "white",
          }
    );
  }, [values]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="biodata">
      <div className="biodata-form">
        <h2>Details About You</h2>
        <div className="bio-fullname">
          <InputForm
            name="firstname"
            type="text"
            placeholder="First name"
            label="Fullname"
            handleChange={handleChange}
            value={values.firstname}
            pattern="^[a-zA-Z]+$"
            errorMessage="Firstname must be letters without spaces and other special characters!"
          />
          <InputForm
            name="lastname"
            type="text"
            placeholder="Last name"
            label="‎"
            handleChange={handleChange}
            value={values.lastname}
            pattern="^[a-zA-Z]+$"
            errorMessage="Lastname must be letters without spaces and other special characters!"
          />
        </div>
        <InputForm type="text" name="address" label="Address" placeholder="Unitary State of the Republic of Isekai" handleChange={handleChange} value={values.address} />
        <div className="other-bio">
          <InputForm type="date" name="date" label="Date of Birth" handleChange={handleChange} value={values.date} />
          <SelectForm name="gender" label="Gender" options={genders} handleChange={handleChange} value={values.gender} />
        </div>
        <Button styleCustom={buttonStyle} handleClick={handleClick}>
          {buttonStyle !== null ? "Skip For Now" : "CONFIRM"}
        </Button>
      </div>
    </div>
  );
}

export default BiodataForm;
