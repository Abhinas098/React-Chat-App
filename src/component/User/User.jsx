import React, { useEffect, useState } from "react";
import img from "../../user.png";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const User = ({ user, onSelectUser, user1, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let onSnap = onSnapshot(doc(db, "lastMsg", id), (docs) => {
      setData(docs.data());
    });
    return () => onSnap();
  }, []);

  return (
    <>
      <div
        className={`wraper ${chat.name === user.name && "selectedUser"}`}
        onClick={() => onSelectUser(user)}
      >
        <div className="info">
          <div className="user_details">
            <img src={user.img || img} alt="img" className="avatar" />
            <h4>{user.name ? user.name : user.email}</h4>
            {data?.from !== user1 && data?.unread && (
              <small className="unread">New</small>
            )}
          </div>
          <div
            className={`user_status ${user.online ? "online" : "offline"}`}
          ></div>
        </div>

        {data && (
          <p className="lstMsg">
            <b>{data.from === user1 ? "me: " : `${user.name}: `}</b>
            {data.text}
          </p>
        )}
      </div>
    </>
  );
};

export default User;
