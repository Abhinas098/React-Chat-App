import React, { useEffect, useState } from "react";
import img from "../../user.png";
import Camera from "../Icons/Camera";
import { auth, db, storage } from "../../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Delete from "../Icons/Delete";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [photo, setPhoto] = useState("");
  const [user, setUser] = useState("");
  const history = useHistory();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docs) => {
      if (docs.exists) {
        setUser(docs.data());
      }
    });

    if (photo) {
      const uploadPhoto = async () => {
        const photoRef = ref(
          storage,
          `user/${new Date().getTime()}- ${photo.name}`
        );
        try {
          if (user.imgPath) {
            await deleteObject(ref(storage, user.imgPath));
          }
          const upload = await uploadBytes(photoRef, photo);
          const url = await getDownloadURL(ref(storage, upload.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            img: url,
            imgPath: upload.ref.fullPath,
          });
          console.log(url);
          setPhoto("");
        } catch (error) {
          console.log(error.message);
        }
      };
      uploadPhoto();
    }
  }, [photo]);

  // Delete picture
  const deleteHandler = async () => {
    try {
      const confirm = window.confirm("Delete Profile Picture ?");
      if (confirm) {
        await deleteObject(ref(storage, user.imgPath));
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          img: "",
          imgPath: "",
        });
        history.push("home");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return user ? (
    <div className="card">
      <div className="Profile">
        <div className="image">
          <img src={user.img || img} alt="User" />
          <div className="overlay">
            <>
              <label htmlFor="photo">
                <Camera />
              </label>
              {user.img && <Delete onDelete={deleteHandler} />}
              <input
                type="file"
                accept="image/"
                id="photo"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </>
          </div>
        </div>
        <div className="text">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <hr />
          <small>Joining on : {user.createdOn.toDate().toDateString()}</small>
        </div>
      </div>
    </div>
  ) : (
    "Loading your profile..."
  );
};

export default Profile;
