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

function EditProfile() {
  const userPict = localStorage.getItem("foto");
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [changeBio, setChangeBio] = useState("");
  const [changeUsername, setChangeUsername] = useState("");
  const [bioLength, setBioLength] = useState(150);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click on file input
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIsPopoverVisible(false);
    // Ubah gambar profil hanya jika file yang dipilih bukan null
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Atur gambar yang dipilih ke dalam state
        setUploadPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePict = (e) => {
    setUploadPhoto(DefaultPict);
    e.stopPropagation();
    setIsPopoverVisible(false);
  };

  const handleSaveChanges = () => {
    if (uploadPhoto) {
      if (uploadPhoto === DefaultPict) {
        localStorage.setItem("foto", null);
      } else {
        localStorage.setItem("foto", uploadPhoto);
      }
    }
  };

  const setImage = () => {
    if (uploadPhoto !== null) {
      return uploadPhoto;
    } else {
      if (userPict === "null" || userPict === null) {
        return DefaultPict;
      } else {
        return userPict;
      }
    }
  };

  const calculatingHeight = () => {
    const countLetter = changeBio.length;
    const countNewline = (changeBio.match(/\n/g) || []).length;
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
      <form className="form-edit-profile">
        <div className="edit-picture" onClick={() => setIsPopoverVisible(true)}>
          <ProfileIcon classImg="center-img" userPict={setImage()} />
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
          <div>Change Profile Picture</div>
          <Input type="file" name="editPict" handleChange={handleFileChange} fileRef={fileInputRef} />
        </div>
        <InputForm
          type="text"
          name="editUsername"
          placeholder="Input New Username"
          label="Change Username"
          handleChange={(e) => {
            setChangeUsername(e.target.value);
          }}
          pattern={validationUsername(changeUsername).pattern}
          errorMessage={validationUsername(changeUsername).message}
        />
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
                setChangeBio(e.target.value);
              }
            } else {
              if (newlineCount < 4) {
                setBioLength(100);
                if (text.length <= bioLength) {
                  setChangeBio(e.target.value);
                }
              } else if (newlineCount > 10) {
                setBioLength(10);
              } else {
                setBioLength(30);
                if (text.length <= bioLength) {
                  setChangeBio(e.target.value);
                }
              }
            }
          }}
          textLength={changeBio.length}
          maxLength={bioLength}
        />
        <p>*save all changes before leave</p>
        <Button handleClick={handleSaveChanges}>Save Changes</Button>
      </form>
    </>
  );
}

export default EditProfile;
