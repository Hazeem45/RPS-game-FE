import React, {useEffect, useState} from "react";
import "./styles/biodataForm.css";
import SelectForm from "../fragments/SelectForm";
import InputForm from "../fragments/InputForm";
import Button from "../elements/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {changeFormatDateToDDMMYYYY, changeFormatDateToDayMonthYear, changeFormatDateToYYYYMMDD} from "../../utils/formatDate";
import SuccessMessage from "../fragments/SuccessMessage";
import {useProfile} from "../../utils/UserProfileContext";
import {errorHandler} from "../../utils/errorHandler";

function BiodataForm({page}) {
  const {userData, setUserData, setAlertTitle, setAlertMessage, setAlertButton, setIsAlertVisible} = useProfile();
  const token = localStorage.getItem("accessToken");
  const [buttonText, setButtonText] = useState(page ? "CONFIRM" : "Save Changes");
  const [textDescription, setTextDescription] = useState("");
  const [isSuccessMessageShow, setIsSuccessMessageShow] = useState(false);
  const navigate = useNavigate();
  const [gendersIndex, setGendersIndex] = useState([]);
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
    const {name, value} = e.target;
    if (name === "gender" && value === "--") {
      setValues({...values, gender: ""});
    } else {
      setValues({...values, [name]: value});
    }
  };

  useEffect(() => {
    if (page === "register") {
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
      setGendersIndex(["--", "Male", "Female", "Other"]);
    } else {
      setValues({
        firstname: userData.firstname,
        lastname: userData.lastname,
        address: userData.address,
        gender: userData.gender,
        date: userData.birthDate ? changeFormatDateToYYYYMMDD(userData.birthDate) : null,
      });

      if (userData.gender === "Male") {
        setGendersIndex(["Male", "Female", "Other", "--"]);
      } else if (userData.gender === "Female") {
        setGendersIndex(["Female", "Male", "Other", "--"]);
      } else if (userData.gender === "Other") {
        setGendersIndex(["Other", "Male", "Female", "--"]);
      } else if (userData.gender === "") {
        setGendersIndex(["--", "Male", "Female", "Other"]);
      }
      setButtonStyle(null);
    }
  }, [page && values, userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Loading...");
    setTextDescription("Save update...");
    try {
      const responseAPI = await axios.put(
        "https://rps-game-be.vercel.app/user/biodata",
        {
          firstName: values.firstname !== null ? values.firstname : null,
          lastName: values.lastname !== null ? values.lastname : null,
          address: values.address !== null ? values.address : null,
          birthDate: values.date !== null ? changeFormatDateToDDMMYYYY(values.date) : null,
          gender: values.gender !== null ? values.gender : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSuccessMessageShow(true);
      console.log(changeFormatDateToDayMonthYear(values.date));
      setUserData({
        ...userData,
        firstname: values.firstname,
        lastname: values.lastname,
        address: values.address,
        gender: values.gender,
        birthDate: values.date ? changeFormatDateToDayMonthYear(values.date) : null,
      });
      if (page && responseAPI) {
        navigate("/dashboard");
        location.reload();
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertTitle(errorHandler(error).alertTitle);
      setAlertMessage(errorHandler(error).alertMessage);
      setAlertButton(errorHandler(error).alertButton);
    }
    setTextDescription("");
    setButtonText(page ? "CONFIRM" : "Save Changes");
  };

  return (
    <div className="biodata">
      {isSuccessMessageShow && <SuccessMessage>Successfully Updated User Data</SuccessMessage>}
      <form className="biodata-form" onSubmit={handleSubmit}>
        <h2>Details About You</h2>
        <div className="bio-fullname">
          <InputForm name="firstname" type="text" placeholder="First name" label="Fullname" handleChange={handleChange} value={values.firstname} pattern=".{0,20}$" errorMessage="Firstname max 20 chars" />
          <InputForm name="lastname" type="text" placeholder="Last name" label="." styleLabel={{color: "transparent"}} handleChange={handleChange} value={values.lastname} pattern=".{0,10}$" errorMessage="Lastname max 10 chars" />
        </div>
        <InputForm type="text" name="address" label="Address" placeholder="Unitary State of the Republic of Isekai" handleChange={handleChange} value={values.address} pattern=".{0,43}$" errorMessage="Address max 43 chars" />
        <div className="other-bio">
          <InputForm type="date" name="date" label="Date of Birth" handleChange={handleChange} value={values.date} />
          <SelectForm name="gender" label="Gender" options={gendersIndex} handleChange={handleChange} />
        </div>
        <h3 style={{textAlign: "center", color: "#f3af34"}}>{page ? "" : textDescription}</h3>
        <Button styleCustom={buttonStyle}>{buttonStyle !== null ? "Skip For Now" : buttonText}</Button>
      </form>
    </div>
  );
}

export default BiodataForm;
