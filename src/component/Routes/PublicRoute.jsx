import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../store/AuthCtx";

const PublicRoute = ({ children, ...rest }) => {
  const { isLogin } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      exact
      render={() => {
        return !isLogin ? children : <Redirect to="/home" />;
      }}
    />
  );
};

export default PublicRoute;
