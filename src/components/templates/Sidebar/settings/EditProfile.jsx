import React, {useEffect, useRef, useState} from "react";
import "./editProfile.css";
import Button from "../../../elements/Button";
import {validationUsername} from "../../../../utils/validation";
import InputForm from "../../../fragments/InputForm";
import ProfileIcon from "../../../fragments/ProfileIcon";
import {DefaultPict} from "../../../../assets/Image";
import TextareaForm from "../../../fragments/TextareaForm";
import Popover from "../../../fragments/Popover";
import Input from "../../../elements/Input";
import {storage} from "../../../../firebaseConfig";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {decrypt} from "../../../../utils/encryption";
import FailMessage from "../../../fragments/FailMessage";
import SuccessMessage from "../../../fragments/SuccessMessage";
import {useNavigate} from "react-router-dom";

function EditProfile() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const [infoBio, setInfoBio] = useState("");
  const [username, setUsername] = useState("");
  const [bioLength, setBioLength] = useState(150);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isFailMessageShow, setIsFailMessageShow] = useState(false);
  const [isSuccessMessageShow, setIsSuccessMessageShow] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [textDescription, setTextDescription] = useState("");
  const [textUploadPict, setTextUploadPict] = useState("Change Profile Picture");
  const [buttonText, setButtonText] = useState("Save Changes");
  const fileInputRef = useRef(null);
  const [URLPicture, setURLPicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      setTextDescription("Please Wait...");
      try {
        const responseAPI = await axios.get("https://rps-game-be.vercel.app/user/biodata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {username, info, profilePicture} = responseAPI.data;
        setURLPicture(profilePicture);
        setUsername(username);
        setInfoBio(info ? info : "");
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 500 || error.response.status === 504) {
          navigate("/dashboard");
        } else {
          alert(error);
        }
      }
      setTextDescription("");
    };
    fetchAPI();
  }, []);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click on file input
    }
  };

  const handleFileChange = async (e) => {
    setIsPopoverVisible(false);
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const imagePath = `assets/user-id-${decrypt(decodedToken.encryptedId)}/photo-profile-${decodedToken.username}`;
      const imageRef = ref(storage, imagePath);
      setTextUploadPict("Uploading...");
      await uploadBytes(imageRef, selectedFile);

      getDownloadURL(imageRef).then(async (res) => {
        setURLPicture(res);
        try {
          await axios.put(
            "https://rps-game-be.vercel.app/user/biodata",
            {
              profilePicture: res,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setURLPicture(res);
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 500 || error.response.status === 504) {
            navigate("/dashboard");
          } else {
            alert(error);
          }
        }
      });
      setTextUploadPict("Change Profile Picture");
    }
  };

  const handleDeletePict = (e) => {
    e.stopPropagation();
    setIsPopoverVisible(false);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setButtonText("Loading...");
    setTextDescription("Save update...");
    try {
      await axios.put(
        "https://rps-game-be.vercel.app/user/profile",
        {
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.put(
        "https://rps-game-be.vercel.app/user/biodata",
        {
          infoBio: infoBio !== "" ? infoBio : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSuccessMessageShow(true);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        navigate("/dashboard");
      } else if (error.response.status) {
        if (error.response.status === 401 || error.response.status === 500 || error.response.status === 504) {
          navigate("/dashboard");
        }
      } else {
        setFailMessage(error.response.data.message);
      }
      setIsFailMessageShow(true);
    }
    setTextDescription("");
    setButtonText("Save Changes");
  };

  const calculatingHeight = () => {
    const countLetter = infoBio.length;
    const countNewline = (infoBio.match(/\n/g) || []).length;
    if (countLetter < 95) {
      if (countNewline == 0) {
        return 120;
      } else if (countNewline > 3) {
        return 140 + countNewline * 10;
      }
    } else if (countLetter >= 95) {
      return 140;
    }
  };

  return (
    <>
      {isSuccessMessageShow && <SuccessMessage>Successfully Updated User Data</SuccessMessage>}
      <form className="form-edit-profile" onSubmit={handleSaveChanges}>
        <div className="edit-picture" onClick={() => setIsPopoverVisible(true)}>
          <ProfileIcon classImg="center-img" userPict={URLPicture ? URLPicture : DefaultPict} />
          {isPopoverVisible && (
            <Popover
              title="Change Picture"
              child1="Upload Photo"
              child2="Delete Photo"
              handleClickChild1={handleFileButtonClick}
              handleClickChild2={handleDeletePict}
              handleClose={(e) => {
                e.stopPropagation();
                setIsPopoverVisible(false);
              }}
            />
          )}
          <div>{textUploadPict}</div>
          <Input type="file" name="editPict" handleChange={handleFileChange} fileRef={fileInputRef} accept="image/png, image/jpeg" />
        </div>

        <InputForm
          type="text"
          name="editUsername"
          placeholder="Input New Username"
          label="Change Username"
          handleChange={(e) => {
            setUsername(e.target.value);
            setIsFailMessageShow(false);
            setIsSuccessMessageShow(false);
          }}
          value={username}
          pattern={validationUsername(username).pattern}
          errorMessage={validationUsername(username).message}
        />
        {isFailMessageShow && <FailMessage>{failMessage}</FailMessage>}
        <TextareaForm
          style={{height: `${calculatingHeight()}px`}}
          name="edit-bio"
          label="Change Bio"
          handleChange={(e) => {
            const text = e.target.value;
            const newlineCount = (text.match(/\n/g) || []).length;
            if (newlineCount < 2) {
              setBioLength(150);
              if (text.length <= bioLength) {
                setInfoBio(e.target.value);
              }
            } else {
              if (newlineCount < 4) {
                setBioLength(100);
                if (text.length <= bioLength) {
                  setInfoBio(e.target.value);
                }
              } else if (newlineCount > 10) {
                setBioLength(10);
              } else {
                setBioLength(30);
                if (text.length <= bioLength) {
                  setInfoBio(e.target.value);
                }
              }
            }
            setIsSuccessMessageShow(false);
          }}
          value={infoBio}
          textLength={infoBio.length}
          maxLength={bioLength}
        />
        <h3 style={{textAlign: "center", color: "#f3af34"}}>{textDescription}</h3>
        <Button>{buttonText}</Button>
      </form>
    </>
  );
}

export default EditProfile;
