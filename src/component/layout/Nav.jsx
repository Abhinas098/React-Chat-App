import React from "react";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <>
      <div className="nav">
        <h2>
          <NavLink to="/">Chat App</NavLink>
        </h2>
        <div>
          <NavLink to="register">Register</NavLink>
          <NavLink to="login">Login</NavLink>
          <button>dark</button>
        </div>
      </div>
    </>
  );
};

export default Nav;
