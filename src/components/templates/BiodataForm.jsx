import React, {useContext, useEffect, useState} from "react";
import "./styles/biodataForm.css";
import SelectForm from "../fragments/SelectForm";
import InputForm from "../fragments/InputForm";
import Button from "../elements/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
// import formatTimeByTimezoneOffset from "../../utils/formatTimeByTimezoneOffset";

function BiodataForm({page}) {
  const token = localStorage.getItem("accessToken");
  const [buttonText, setButtonText] = useState(page ? "CONFIRM" : "Save Changes");
  const navigate = useNavigate();
  const [gendersIndex, setGendersIndex] = useState([]);
  // const genders = ["Male", "Female", "Other", "--"];
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

  const changeFormateDateToDDMMYYYY = (value) => {
    const splitDate = value.split("-");
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  };

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
        try {
          const responseAPI = await axios.get("https://rps-game-be.vercel.app/user/biodata", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const {username, firstName, lastName, address, gender, birthDate, joinAt, joinDate} = responseAPI.data;
          const monthNames = {
            January: "01",
            February: "02",
            March: "03",
            April: "04",
            May: "05",
            June: "06",
            July: "07",
            August: "08",
            September: "09",
            October: "10",
            November: "11",
            December: "12",
          };
          let userOffset = new Date().getTimezoneOffset() / 60;
          userOffset = -userOffset;
          const splitedDate = joinAt.split("T");
          const splitedTime = splitedDate[1].split(".");
          const time = splitedTime[0].split(":");
          let hour = parseInt(time[0]) + userOffset;
          let minute = parseInt(time[1]);
          let UTC = userOffset > 0 ? `UTC+${userOffset}` : `UTC${userOffset}`;
          if (hour >= 24) {
            hour -= 24;
          } else if (hour < 0) {
            hour += 24;
          }
          const offset = userOffset > 0 ? `+${userOffset}` : userOffset;
          const paddedHour = (hour < 10 ? "0" : "") + hour;
          const paddedMinute = (minute < 10 ? "0" : "") + minute;
          const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          // ======
          const realTime = new Date();
          const realHour = realTime.getHours();
          const realMinute = realTime.getMinutes();
          console.log(`waktu sekarang : ${realHour}:${realMinute}`);
          alert(`waktu sekarang : ${realHour}:${realMinute}`);

          console.log({
            joinAt: `${paddedHour}:${paddedMinute} ${UTC}`,
            userOffset: userOffset > 0 ? `+${userOffset}` : userOffset,
            userTimeZone: userTimeZone,
          });
          alert(`JoinAt: ${joinDate} ${paddedHour}:${paddedMinute} ${UTC}`);
          alert(`userOffset: ${offset}`);
          alert(`serTimeZone: ${userTimeZone}`);
          const changeFormateDateToYYYYMMDD = (value) => {
            const dateParts = value.split(" ");
            const day = dateParts[0];
            const monthName = dateParts[1];
            const year = dateParts[2];
            const monthNumber = monthNames[monthName];
            const formattedDate = `${year}-${monthNumber}-${day}`;
            return formattedDate;
          };
          setValues({
            firstname: firstName !== null ? firstName : username,
            lastname: lastName !== null ? lastName : "",
            address: address !== null ? address : "",
            gender: gender !== null ? gender : "",
            date: birthDate !== null ? changeFormateDateToYYYYMMDD(birthDate) : "",
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
          alert(error);
        }
      };
      fetchUserBiodata();
    }
  }, [page && values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Loading...");
    console.log("start Loading...");
    try {
      const responseAPI = await axios.put(
        "https://rps-game-be.vercel.app/user/biodata",
        {
          firstName: values.firstname !== "" ? values.firstname : null,
          lastName: values.lastname !== "" ? values.lastname : null,
          infoBio: null,
          address: values.address !== "" ? values.address : null,
          birthDate: values.date !== "" ? changeFormateDateToDDMMYYYY(values.date) : null,
          gender: values.gender !== "" ? values.gender : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (page && responseAPI) {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response.statusText);
    }
    setButtonText(page ? "CONFIRM" : "Save Changes");
    console.log("end loading...");
  };

  return (
    <div className="biodata">
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
        <Button styleCustom={buttonStyle}>{buttonStyle !== null ? "Skip For Now" : buttonText}</Button>
      </form>
    </div>
  );
}

export default BiodataForm;
