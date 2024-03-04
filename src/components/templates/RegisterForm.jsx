import React, {useState} from "react";
import "./styles/registerForm.css";
import InputForm from "../fragments/InputForm";
import CheckboxForm from "../fragments/CheckboxForm";
import Button from "../elements/Button";
import LineWithText from "../fragments/LineWithText";
import BiodataForm from "./BiodataForm";
import Input from "../elements/Input";
import ErrorMessage from "../elements/ErrorMessage";
import {validationPassword, validationUsername} from "../../utils/validation";
import {useNavigate} from "react-router-dom";

function RegisterForm() {
  const [inputType, setInputType] = useState("password");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      type: "text",
      name: "username",
      placeholder: "Input new username",
      label: "Username",
      pattern: validationUsername(values.username).pattern,
      errorMessage: validationUsername(values.username).message,
      required: true,
    },
    {
      id: 2,
      type: "email",
      name: "email",
      placeholder: "example@domain.com",
      label: "Email",
      errorMessage: "format email is invalid",
      required: true,
    },
    {
      id: 3,
      type: `${inputType}`,
      name: "password",
      placeholder: "Input password",
      label: "Password",
      pattern: validationPassword(values.password).pattern,
      errorMessage: validationPassword(values.password).message,
      required: true,
    },
  ];

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const buttonStyleCustom = {
    background: "#333",
    boxShadow: "none",
    color: "white",
  };

  const handleSubmit = (e) => {
    setIsOpen(!isOpen);
    e.preventDefault();
  };

  return (
    <div className="register-form unselectable">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <InputForm key={input.id} {...input} value={values[input.name]} handleChange={handleChange} />
        ))}
        <div style={{display: "flex", marginBottom: "25px"}}>
          <div style={{width: "100%"}}>
            <Input type={inputType} name="confirmPassword" placeholder="Confirm Password" handleChange={handleChange} pattern={values.password} required />
            <ErrorMessage errorMessage="password don't match!" />
          </div>
          <CheckboxForm
            handleChange={(e) => {
              if (e.target.checked === true) {
                setInputType("text");
              } else {
                setInputType("password");
              }
            }}
            value="Show"
            name="checkbox"
          />
        </div>
        <Button>Register</Button>
      </form>
      <div style={{width: "100%", marginBottom: "10px"}}>
        <LineWithText value="Or" />
        <Button styleCustom={buttonStyleCustom} handleClick={() => navigate("/login")}>
          Sign In
        </Button>
      </div>
      {isOpen && <BiodataForm />}
    </div>
  );
}

export default RegisterForm;
