import React, { useState } from "react";
import img from "../../user.png";
import Camera from "../Icons/Camera";

const Profile = () => {
  const [photo, setPhoto] = useState("");

  console.log(photo);
  return (
    <div className="card">
      <div className="Profile">
        <div className="image">
          <img src={img} alt="User" />
          <div className="overlay">
            <>
              <label htmlFor="photo">
                <Camera />
              </label>
              <input
                type="file"
                accept="image/"
                id="photo"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </>
          </div>
        </div>
        <div className="text-container">
          <h3>Abhinas Dash</h3>
          <p>abhinasdash143@gmail.com</p>
          <hr />
          <small>Joining on 25 may</small>
        </div>
      </div>
    </div>
  );
};

export default Profile;
