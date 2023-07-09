import React,{useContext} from "react";
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../../store/AuthCtx";

const PrivateRoute = ({ children, ...rest }) => {
    const {isLogin} = useContext(AuthContext)
  return (
    <Route
      {...rest}
      exact
      render={() => {
        return isLogin ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
