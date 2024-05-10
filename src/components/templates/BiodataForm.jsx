import React, {useEffect, useState} from "react";
import "./styles/biodataForm.css";
import SelectForm from "../fragments/SelectForm";
import InputForm from "../fragments/InputForm";
import Button from "../elements/Button";
import {useNavigate} from "react-router-dom";

function BiodataForm({page}) {
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

  const handleSubmit = () => {
    if (page) {
      navigate("/");
    }
  };

  return (
    <div className="biodata">
      <form className="biodata-form" onSubmit={handleSubmit}>
        <h2>Details About You</h2>
        <div className="bio-fullname">
          <InputForm name="firstname" type="text" placeholder="First name" label="Fullname" handleChange={handleChange} value={values.firstname} pattern=".{0,20}$" errorMessage="Firstname max 20 chars" />
          <InputForm name="lastname" type="text" placeholder="Last name" label="‎" handleChange={handleChange} value={values.lastname} pattern=".{0,10}$" errorMessage="Lastname max 10 chars" />
        </div>
        <InputForm type="text" name="address" label="Address" placeholder="Unitary State of the Republic of Isekai" handleChange={handleChange} value={values.address} pattern=".{0,43}$" errorMessage="Lastname max 43 chars" />
        <div className="other-bio">
          <InputForm type="date" name="date" label="Date of Birth" handleChange={handleChange} value={values.date} />
          <SelectForm name="gender" label="Gender" options={genders} handleChange={handleChange} value={values.gender} />
        </div>
        <Button styleCustom={buttonStyle}>{buttonStyle !== null ? "Skip For Now" : "CONFIRM"}</Button>
      </form>
    </div>
  );
}

export default BiodataForm;
