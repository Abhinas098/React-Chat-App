import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import LoadingSpinner from "../component/layout/LoadingSpiner";

export const AuthContext = createContext({
  isLogin: null,
  loading: false,
});

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      [auth]
    );
  }, []);

  const contextValue = {
    isLogin: user,
    loading: loading,
  };
  if (loading) {
    return (
      <center>
        <LoadingSpinner />
      </center>
    );
  }
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
