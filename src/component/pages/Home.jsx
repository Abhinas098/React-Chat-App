import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import User from "../User/User";

const Home = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <>
      <div className="home">
        <div className="user">
          {users.map((user) => (
            <User key={user.uid} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
