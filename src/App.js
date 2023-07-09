import { Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./component/layout/Nav";
import Register from "./component/Auth/Register";
import Home from "./component/pages/Home";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import Login from "./component/Auth/Login";
import { useContext } from "react";
import { AuthContext } from "./store/AuthCtx";
import PublicRoute from "./component/Routes/PublicRoute";
import PrivateRoute from "./component/Routes/PrivateRoute";

function App() {

  return (
    <>
      <Nav />
      <Switch>
        <PublicRoute path="/" exact>
          <Redirect to="register" />
        </PublicRoute>

        <PublicRoute path="/register" exact>
          <Register />
        </PublicRoute>

        <PublicRoute path="/login" exact>
          <Login />
        </PublicRoute>

        <PrivateRoute path="/home" exact>
          <Home />
        </PrivateRoute>

        <PrivateRoute path="*" exact>
          <Redirect to="home" />
        </PrivateRoute>

        <PublicRoute path="*" exact>
          <Redirect to="/" />
        </PublicRoute>
      </Switch>
    </>
  );
}

export default App;
