import React, {useEffect, useState} from "react";
import "./personalDetail.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {getLocaleDate} from "../../../../utils/formatDate";
import Input from "../../../elements/Input";

function PersonalDetail({URLPicture}) {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [textDescription, setTextDescription] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    joinDate: "",
    userTimezone: "",
  });
  useEffect(() => {
    const fetchAPI = async () => {
      setTextDescription("Please Wait...");
      try {
        const responseAPI = await axios.get("https://rps-game-be.vercel.app/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {id, username, email, joinAt} = responseAPI.data;
        const joinDate = `${getLocaleDate(joinAt).date} ${getLocaleDate(joinAt).time}`;
        const userTimezone = `${getLocaleDate(joinAt).timeZone} ${getLocaleDate(joinAt).localZone}`;
        setUserData({id, username, email, joinDate, userTimezone});
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
    fetchAPI();
  }, []);

  return (
    <div className="personal-detail">
      <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
        <div>
          <p style={{color: "#f3af34"}}>Your ID : </p>
          <p>{userData.id}</p>
        </div>
        <div>
          <p style={{color: "#f3af34"}}>Username : </p>
          <p>{userData.username}</p>
        </div>
        <div>
          <p style={{color: "#f3af34"}}>Your Email :</p>
          <p>{userData.email}</p>
        </div>
        <div>
          <p style={{color: "#f3af34"}}>Join At :</p>
          <p>{userData.joinDate}</p>
        </div>
        <div>
          <p style={{color: "#f3af34"}}>Your Time Zone :</p>
          <p>{userData.userTimezone}</p>
        </div>
        <div>
          <p style={{color: "#f3af34"}}>Your URL Profile Picture :</p>
          <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
            <input type="text" value={URLPicture ? URLPicture : "picture not set"} readOnly />
            <button
              style={{position: "inherit", width: "70px", background: "orange"}}
              onClick={() => {
                if (URLPicture) {
                  navigator.clipboard.writeText(URLPicture);
                  alert("URL copied");
                }
              }}
            >
              Copy
            </button>
          </div>
          <p>*Don't share your Profile Picture URL </p>
        </div>
      </div>
      <Link>Change Password?</Link>
      <h3 style={{textAlign: "center", color: "#f3af34"}}>{textDescription}</h3>
    </div>
  );
}

export default PersonalDetail;
