import React, {useEffect, useState} from "react";
import "./styles/biodataForm.css";
import SelectForm from "../fragments/SelectForm";
import InputForm from "../fragments/InputForm";
import Button from "../elements/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {changeFormatDateToDDMMYYYY, changeFormatDateToYYYYMMDD} from "../../utils/formatDate";
import SuccessMessage from "../fragments/SuccessMessage";
// import formatTimeByTimezoneOffset from "../../utils/formatTimeByTimezoneOffset";

function BiodataForm({page}) {
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
    // setValues({...values, [e.target.name]: e.target.value});
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
      const fetchUserBiodata = async () => {
        setTextDescription("Please Wait...");
        try {
          const responseAPI = await axios.get("https://rps-game-be.vercel.app/user/biodata", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const {username, firstName, lastName, address, gender, birthDate} = responseAPI.data;

          setValues({
            firstname: firstName !== null ? firstName : username,
            lastname: lastName !== null ? lastName : "",
            address: address !== null ? address : "",
            gender: gender !== null ? gender : "",
            date: birthDate !== null ? changeFormatDateToYYYYMMDD(birthDate) : "",
          });
          if (gender === "Male") {
            setGendersIndex(["Male", "Female", "Other", "--"]);
          } else if (gender === "Female") {
            setGendersIndex(["Female", "Male", "Other", "--"]);
          } else if (gender === "Other") {
            setGendersIndex(["Other", "Male", "Female", "--"]);
          } else if (gender === null) {
            setGendersIndex(["--", "Male", "Female", "Other"]);
          }
          if (!page) {
            setButtonStyle(null);
          }
        } catch (error) {
          if (error.code === "ERR_NETWORK") {
            navigate("/dashboard");
          } else if (error.response.status) {
            if (error.response.status === 401 || error.response.status === 500) {
              navigate("/dashboard");
            }
          } else {
            alert(error);
          }
        }
        setTextDescription("");
      };
      fetchUserBiodata();
    }
  }, [page && values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Loading...");
    setTextDescription("Save update...");
    try {
      const responseAPI = await axios.put(
        "https://rps-game-be.vercel.app/user/biodata",
        {
          firstName: values.firstname !== "" ? values.firstname : null,
          lastName: values.lastname !== "" ? values.lastname : null,
          address: values.address !== "" ? values.address : null,
          birthDate: values.date !== "" ? changeFormatDateToDDMMYYYY(values.date) : null,
          gender: values.gender !== "" ? values.gender : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSuccessMessageShow(true);
      if (page && responseAPI) {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response.statusText);
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
          <InputForm name="lastname" type="text" placeholder="Last name" label="‎" handleChange={handleChange} value={values.lastname} pattern=".{0,10}$" errorMessage="Lastname max 10 chars" />
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
