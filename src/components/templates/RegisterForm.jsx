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
import axios from "axios";
import FailMessage from "../fragments/FailMessage";

function RegisterForm() {
  const [inputType, setInputType] = useState("password");
  const [buttonText, setButtonText] = useState("Register");
  const [isBiodataOpen, setIsBiodataOpen] = useState(false);
  const [isFailMessageShow, setIsFailMessageShow] = useState(false);
  const [failMessage, setFailMessage] = useState("");
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
  const buttonStyleCustom = {
    background: "#333",
    boxShadow: "none",
    color: "white",
  };

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
    setIsFailMessageShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Loading...");
    try {
      const responseRegisterAPI = await axios.post("https://rps-game-be.vercel.app/user/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (responseRegisterAPI.data.message === "registration successful") {
        const responseLoginAPI = await axios.post("https://rps-game-be.vercel.app/user/login", {
          email: values.email,
          password: values.password,
        });
        const accessToken = responseLoginAPI.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        setIsBiodataOpen(true);
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        setFailMessage(error.message);
      } else if (error.response.status) {
        if (error.response.status === 400) {
          setFailMessage(error.response.data.errors[0].msg);
        } else if (error.response.status === 409) {
          setFailMessage(error.response.data.message);
        } else if (error.response.status === 500) {
          setFailMessage(error.response.statusText);
        } else {
          setFailMessage(error.message);
        }
      } else {
        alert(error);
      }
      setIsFailMessageShow(true);
    }
    setButtonText("Register");
  };

  return (
    <div className="register-form unselectable">
      <h1 style={{color: isFailMessageShow && "red"}}>Register</h1>
      {isFailMessageShow && <FailMessage>{failMessage}</FailMessage>}
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
        <Button>{buttonText}</Button>
      </form>
      <div style={{width: "100%", marginBottom: "10px"}}>
        <LineWithText value="Or" />
        <Button styleCustom={buttonStyleCustom} handleClick={() => navigate("/login")}>
          Sign In
        </Button>
      </div>
      {isBiodataOpen && <BiodataForm page="register" />}
    </div>
  );
}

export default RegisterForm;
