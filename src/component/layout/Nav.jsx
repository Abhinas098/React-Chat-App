import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../store/AuthCtx";
import { useHistory } from "react-router-dom";
import Logout from "../Icons/Logout";

const Nav = () => {
  let user = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), { online: false });
    await signOut(auth);
    history.push("login");
  };
  return (
    <>
      <div className="nav">
        <h2>
          <NavLink to="/">Chat App</NavLink>
        </h2>
        <div>
          {user.isLogin ? (
            <>
              <NavLink to="profile">Profile</NavLink>
              <Logout onLogout={logoutHandler}></Logout>
            </>
          ) : (
            <>
              <NavLink to="register">Register</NavLink>
              <NavLink to="login">Login</NavLink>
              <button>dark</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
