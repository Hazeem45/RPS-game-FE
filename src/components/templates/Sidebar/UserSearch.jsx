import React, {useEffect, useState} from "react";
import "./userSearch.css";
import Input from "../../elements/Input";
import axios from "axios";
import ProfileNav from "../Navbar/ProfileNav";
import {useProfile} from "../../../utils/UserProfileContext";
import {DefaultPict} from "../../../assets/Image";
import LoaderSpin from "../../fragments/LoaderSpin";
import {errorHandler} from "../../../utils/errorHandler";
import {useNavigate, useParams} from "react-router-dom";

function UserSearch() {
  const token = localStorage.getItem("accessToken");
  const {setAlertTitle, setAlertMessage, setAlertButton, setIsAlertVisible} = useProfile();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [resultDescription, setResultDescription] = useState("");
  const navigate = useNavigate();

  const fetchAPI = async (target) => {
    setIsInputDisabled(true);
    setIsLoading(true);
    try {
      const responseAPI = await axios.get(`https://rps-game-be.vercel.app/user/search-user?username=${target}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchResult(responseAPI.data);
    } catch (error) {
      if (error.response.status === 404) {
        setResultDescription(error.response.data.message);
        setSearchResult([]);
      } else {
        setIsAlertVisible(true);
        setAlertTitle(errorHandler(error).alertTitle);
        setAlertMessage(errorHandler(error).alertMessage);
        setAlertButton(errorHandler(error).alertButton);
      }
    }
    setIsInputDisabled(false);
    setIsLoading(false);
  };

  useEffect(() => {
    // Get the current URL
    const url = window.location.href;
    const value = url.split("=");
    if (value[1] !== undefined) {
      fetchAPI(value[1]);
      setUsername(value[1]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/dashboard/search?username=${username}`);
    fetchAPI(username);
  };

  return (
    <div className="user-search">
      <div className="search-container">
        <div className="search-label">search user</div>
        <form className="search-bar" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Search by username"
            handleChange={(e) => {
              setUsername(e.target.value);
              setResultDescription("");
            }}
            maxLength={25}
            value={username}
            disabled={isInputDisabled}
          />
          <div className="search-logo" onClick={handleSubmit}>
            <svg style={{width: "24px", height: "24px"}} viewBox="0 0 24 24">
              <path
                fill="#666666"
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              />
            </svg>
          </div>
        </form>
      </div>
      {isLoading ? (
        <div style={{display: "grid", placeItems: "center"}}>
          <div style={{width: "50%"}}>
            <LoaderSpin />
          </div>
        </div>
      ) : (
        <div className="result-search">
          {searchResult.map((profile) => (
            <div key={profile.username} className="profile-box" onClick={() => navigate(`/${profile.username}`)}>
              <ProfileNav username={profile.username} userPict={profile.profilePicture ? profile.profilePicture : DefaultPict} />
            </div>
          ))}
          <h4 style={{maxWidth: "310px", textAlign: "center"}}>{resultDescription}</h4>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
