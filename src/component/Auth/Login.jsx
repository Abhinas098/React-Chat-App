import React, { useState } from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    loading: false,
    error: null,
  });
  const { email, password, loading, error } = data;

  const changeHandler = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required!", loading: false });
    }
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        email,
        online: true,
      });
      setData({
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
      <h3>Login</h3>
      <form className="form" onSubmit={submitHandler}>
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
            {loading ? "Loging in ..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
