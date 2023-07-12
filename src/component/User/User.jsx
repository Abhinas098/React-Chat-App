import React from "react";
import img from "../../user.png";

const User = ({ user, onSelectUser }) => {
  return (
    <div className="wraper" onClick={() => onSelectUser(user)}>
      <div className="info">
        <div className="user_details">
          <img src={user.img || img} alt="img" className="avatar" />
          <h4>{user.name}</h4>
        </div>
        <div
          className={`user_status ${user.online ? "online" : "offline"}`}
        ></div>
      </div>
    </div>
  );
};

export default User;
