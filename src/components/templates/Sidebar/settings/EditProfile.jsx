import React, {useEffect, useRef, useState} from "react";
import "./editProfile.css";
import Button from "../../../elements/Button";
import {checkIfValidImage, validateToken, validationUsername} from "../../../../utils/validation";
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
import {useProfile} from "../../../../utils/UserProfileContext";
import {errorHandler} from "../../../../utils/errorHandler";

function EditProfile() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const {userData, setUserData, setAlertTitle, setAlertMessage, setAlertButton, setIsAlertVisible} = useProfile();
  const [username, setUsername] = useState("");
  const [infoBio, setInfoBio] = useState("");
  const [bioLength, setBioLength] = useState(150);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isFailMessageShow, setIsFailMessageShow] = useState(false);
  const [isSuccessMessageShow, setIsSuccessMessageShow] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [textDescription, setTextDescription] = useState("");
  const [textUploadPict, setTextUploadPict] = useState("Change Profile Picture");
  const [buttonText, setButtonText] = useState("Save Changes");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUsername(userData.username === null ? "" : userData.username);
    setInfoBio(userData.infoBio === null ? "" : userData.infoBio);
  }, [userData]);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click on file input
    }
  };

  const handleFileChange = async (e) => {
    setIsPopoverVisible(false);
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      try {
        // File type validation
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(selectedFile.type)) {
          throw new Error("Only JPG, JPEG, and PNG files are allowed");
        }

        // File size validation
        const minSize = 11 * 1024; // 11 KB
        const maxSize = 7 * 1024 * 1024; // 7 MB
        if (selectedFile.size < minSize) {
          throw new Error("This file is to small, File size must be at least 11KB");
        } else if (selectedFile.size > maxSize) {
          throw new Error("This file is to large, Maximum file size is 7 MB");
        }

        // File corruption check
        const fileIsValidImage = await checkIfValidImage(selectedFile);
        if (!fileIsValidImage) {
          throw new Error("The file is corrupted or not a valid image");
        }

        setTextUploadPict("Uploading...");
        setUserData({...userData, pictureURL: null});
        const imagePath = `assets/user-id-${decrypt(decodedToken.encryptedId)}/photo-profile-${userData.username}`;
        const imageRef = ref(storage, imagePath);
        await uploadBytes(imageRef, selectedFile);

        getDownloadURL(imageRef).then(async (res) => {
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
            setUserData({...userData, pictureURL: res});
          } catch (error) {
            setIsAlertVisible(true);
            setAlertTitle(errorHandler(error).alertTitle);
            setAlertMessage(errorHandler(error).alertMessage);
            setAlertButton(errorHandler(error).alertButton);
          }
        });
      } catch (error) {
        if (error.message === "Only JPG, JPEG, and PNG files are allowed") {
          setAlertTitle("Invalid Type File");
        } else if (error.message === "The file is corrupted or not a valid image") {
          setAlertTitle("Invalid Image");
        } else {
          setAlertTitle("Invalid File Size");
          setAlertMessage(error.message);
        }
        setAlertButton("CLOSE");
        setIsAlertVisible(true);
      }
      setTextUploadPict("Change Profile Picture");
    }
  };

  const handleDeletePict = async (e) => {
    e.stopPropagation();
    setIsPopoverVisible(false);
    if (userData.pictureURL !== DefaultPict) {
      setTextUploadPict("Removing image...");
      try {
        await axios.put(
          "https://rps-game-be.vercel.app/user/biodata",
          {
            profilePicture: null,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData({...userData, pictureURL: DefaultPict});
      } catch (error) {
        setIsAlertVisible(true);
        setAlertTitle(errorHandler(error).alertTitle);
        setAlertMessage(errorHandler(error).alertMessage);
        setAlertButton(errorHandler(error).alertButton);
      }
      setTextUploadPict("Change Profile Picture");
    } else {
      alert(`You don't have a profile picture`);
    }
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
      setUserData({...userData, username: username, infoBio: infoBio});
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 409) {
        if (error.response.status === 400) {
          setFailMessage(error.response.data.errors[0].msg);
        } else if (error.response.status === 409) {
          setFailMessage(error.response.data.message);
        }
        setIsFailMessageShow(true);
      } else {
        setIsAlertVisible(true);
        setAlertTitle(errorHandler(error).alertTitle);
        setAlertMessage(errorHandler(error).alertMessage);
        setAlertButton(errorHandler(error).alertButton);
      }
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
          <ProfileIcon classImg="center-img" userPict={userData.pictureURL} />
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
