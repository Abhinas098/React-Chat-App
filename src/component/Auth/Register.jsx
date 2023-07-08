import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
    error: null,
  });
  const { name, email, password, loading, error } = data;

  const changeHandler = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required!", loading: false });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdOn: Timestamp.fromDate(new Date()),
        online: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        loading: false,
        error: null,
      });
      history.push("/home");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  return (
    <div className="card">
      <h3>Create An Account</h3>
      <form className="form" onSubmit={submitHandler}>
        <div className="input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={changeHandler}
          />
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
          />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeHandler}
          />
        </div>
        {error && <p id="error">{error}</p>}
        <div className="btn">
          <button disabled={loading}>
            {loading ? "Loading ..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
