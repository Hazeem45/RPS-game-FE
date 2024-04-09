import React from "react";
import "./personalDetail.css";
import {Link} from "react-router-dom";

function PersonalDetail({email}) {
  return (
    <div className="personal-detail">
      <div>
        <p>Your email :</p>
        <p>{email}</p>
      </div>
      <Link>Change Password?</Link>
    </div>
  );
}

export default PersonalDetail;
