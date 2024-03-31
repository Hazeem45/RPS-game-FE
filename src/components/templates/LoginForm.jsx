import React, {useState} from "react";
import "./styles/loginForm.css";
import InputForm from "../fragments/InputForm";
import Button from "../elements/Button";
import {Link, useNavigate} from "react-router-dom";
import CheckboxForm from "../fragments/CheckboxForm";
import LineWithText from "../fragments/LineWithText";
import {validationPassword} from "../../utils/validation";

function LoginForm() {
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const buttonStyleCustom = {
    background: "#333",
    boxShadow: "none",
    color: "white",
  };

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

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    // temporarily use password and email as accesstoken, because they are not yet connected to the backend (for testing only)
    const accessToken = values.email + values.password;
    localStorage.setItem("accessToken", accessToken);
    navigate("/");
  };

  return (
    <div className="login-form unselectable">
      <h1>Login</h1>
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
        <Link>Forgot Password?</Link>
        <Button>Login</Button>
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
