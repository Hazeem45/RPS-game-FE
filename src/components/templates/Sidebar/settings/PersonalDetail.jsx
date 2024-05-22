import React, {useEffect, useState} from "react";
import "./personalDetail.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function PersonalDetail() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [textDescription, setTextDescription] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
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
        const {id, username, email} = responseAPI.data;
        setUserData({id, username, email});
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
      </div>
      <Link>Change Password?</Link>
      <h3 style={{textAlign: "center", color: "#f3af34"}}>{textDescription}</h3>
    </div>
  );
}

export default PersonalDetail;
