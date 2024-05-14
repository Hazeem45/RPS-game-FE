import React, {useState} from "react";
import "./styles/loginForm.css";
import InputForm from "../fragments/InputForm";
import Button from "../elements/Button";
import {Link, useNavigate} from "react-router-dom";
import CheckboxForm from "../fragments/CheckboxForm";
import LineWithText from "../fragments/LineWithText";
import {validationPassword} from "../../utils/validation";
import axios from "axios";
import AuthFailMessage from "../fragments/AuthFailMessage";

function LoginForm() {
  const [inputType, setInputType] = useState("password");
  const [buttonText, setButtonText] = useState("Login");
  const [isFailMessageShow, setIsFailMessageShow] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      type: "email",
      name: "email",
      placeholder: "example@domain.com",
      label: "Email",
      errorMessage: "format email is invalid",
      required: true,
    },
    {
      id: 2,
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
      const responseAPI = await axios.post("https://rps-game-be.vercel.app/user/login", {
        email: values.email,
        password: values.password,
      });
      if (responseAPI) {
        const accessToken = responseAPI.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setFailMessage(error.message);
      } else {
        if (error.response.status) {
          if (error.response.status === 400) {
            setFailMessage(error.response.data.errors[0].msg);
          } else if (error.response.status === 500) {
            setFailMessage(error.response.statusText);
          } else {
            setFailMessage(error.response.data.message);
          }
        }
      }
      setIsFailMessageShow(true);
    }
    setButtonText("Login");

    // temporarily use password and email as accesstoken, because they are not yet connected to the backend (for testing only)
    // const accessToken = values.email + values.password;
    // localStorage.setItem("accessToken", accessToken);
    // navigate("/dashboard");
  };

  return (
    <div className="login-form unselectable">
      <h1 style={{color: isFailMessageShow && "red"}}>Login</h1>
      {isFailMessageShow && <AuthFailMessage>{failMessage}</AuthFailMessage>}
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <InputForm key={input.id} {...input} value={values[input.name]} handleChange={handleChange} />
        ))}
        <CheckboxForm
          handleChange={(e) => {
            if (e.target.checked === true) {
              setInputType("text");
            } else {
              setInputType("password");
            }
          }}
          value="Show Password"
          name="checkbox"
          styleCustom={{marginBottom: "15px"}}
        />
        {/* <Link>Forgot Password?</Link> */}
        <Button>{buttonText}</Button>
      </form>
      <div style={{width: "100%"}}>
        <LineWithText value="Or" />
        <Button styleCustom={buttonStyleCustom} handleClick={() => navigate("/register")}>
          Create New Account
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
