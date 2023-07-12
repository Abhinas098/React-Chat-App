import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import User from "../User/User";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    const users = collection(db, "users");

    const querys = query(users, where("uid", "not-in", [auth.currentUser.uid]));

    const onSnap = onSnapshot(querys, (querySnap) => {
      console.log(querySnap);
      let users = [];
      querySnap.forEach((docs) => {
        users.push(docs.data());
      });
      setUsers(users);
    });
    return () => onSnap;
  }, []);

  const selectUserHandler = (user) => {
    setChat(user);
  };

  return (
    <>
      <div className="home">
        <div className="user">
          {users.map((user) => (
            <User key={user.uid} user={user} onSelectUser={selectUserHandler} />
          ))}
        </div>
        <div className="messages">
          {chat ? (
            <div className="user_nm">
              <h3>{chat.name}</h3>
            </div>
          ) : (
            <h3 className="not">Select a user to start Chat</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
