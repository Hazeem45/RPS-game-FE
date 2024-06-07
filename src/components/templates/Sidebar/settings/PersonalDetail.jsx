import React, {useState} from "react";
import "./personalDetail.css";
import {Link} from "react-router-dom";
import {getLocaleDate} from "../../../../utils/formatDate";
import {useProfile} from "../../../../utils/UserProfileContext";
import {jwtDecode} from "jwt-decode";
import {decrypt} from "../../../../utils/encryption";

function PersonalDetail() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const {userData} = useProfile();
  const [userId, setUserId] = useState(decodedToken.encryptedId);

  return (
    <div className="personal-detail">
      <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
        <div>
          <p style={{color: "#f3af34"}}>Your ID : </p>
          <input style={{background: "transparent", border: "none", color: "white"}} type="text" value={userId} readOnly />
          <button
            style={{position: "inherit", width: "100px", background: "orange"}}
            onClick={() => {
              setUserId(decrypt(decodedToken.encryptedId));
            }}
          >
            Decrypt!
          </button>
        </div>
        <div>
          <p style={{color: "#f3af34"}}>Username : </p>
          <p>{userData.username === null ? "" : userData.username}</p>
        </div>
        <div>
          <p style={{color: "#f3af34"}}>Your Email :</p>
          <p>{userData.email === null ? "" : userData.email}</p>
        </div>
        <div>
          <p style={{color: "#f3af34"}}>Join At :</p>
          <p>{`${getLocaleDate(userData.joinDate).date} ${getLocaleDate(userData.joinDate).time} ${getLocaleDate(userData.joinDate).timeZone}`}</p>
        </div>
        <div>
          <p style={{color: "#f3af34"}}>Your Locale Zone :</p>
          <p>{getLocaleDate(userData.joinDate).localZone}</p>
        </div>
        <div>
          <p style={{color: "#f3af34"}}>Your URL Profile Picture :</p>
          <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
            <input type="text" value={userData.pictureURL ? userData.pictureURL : "No Profile Picture"} readOnly />
            <button
              style={{position: "inherit", width: "70px", background: "orange"}}
              onClick={() => {
                if (userData.pictureURL) {
                  // Create a temporary input element
                  const tempInput = document.createElement("input");
                  tempInput.value = userData.pictureURL;
                  document.body.appendChild(tempInput);
                  // Select the URL text
                  tempInput.select();
                  tempInput.setSelectionRange(0, 99999); // For mobile devices
                  // Execute the copy command
                  document.execCommand("copy");
                  // Remove the temporary input element
                  document.body.removeChild(tempInput);
                  // navigator.clipboard.writeText(userData.pictureURL);
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
    </div>
  );
}

export default PersonalDetail;
