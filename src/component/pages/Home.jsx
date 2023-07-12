import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "../User/User";
import MessageForm from "../User/MessageForm";
import Message from "../User/Message";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msg, setMsg] = useState([]);

  const user1 = auth.currentUser.uid;
  useEffect(() => {
    const users = collection(db, "users");

    const querys = query(users, where("uid", "not-in", [user1]));

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

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgRef = collection(db, "messages", id, "chat");
    const qry = query(msgRef, orderBy("createdOn", "asc"));

    onSnapshot(qry, (querySnap) => {
      let msgs = [];
      querySnap.forEach((doc) => {
        msgs.push(doc.data());
      });

      setMsg(msgs);
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dUrl;
    }
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdOn: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    setText("");
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
            <>
              <div className="user_nm">
                <h3>{chat.name ? chat.name : chat.email}</h3>
              </div>

              <div className="message">
                {msg.length
                  ? msg.map((msg, i) => (
                      <Message key={i} msg={msg} user1={user1} />
                    ))
                  : null}
              </div>

              <MessageForm
                submitHandler={submitHandler}
                text={text}
                setText={setText}
                setImg={setImg}
              />
            </>
          ) : (
            <h3 className="not">Select a user to start Chat</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
