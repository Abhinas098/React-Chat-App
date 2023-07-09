import { Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./component/layout/Nav";
import Register from "./component/Auth/Register";
import Home from "./component/pages/Home";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import Login from "./component/Auth/Login";
import { useContext } from "react";
import { AuthContext } from "./store/AuthCtx";

function App() {
  const {isLogin}= useContext(AuthContext);
  return (
    <>
      <Nav />
      <Switch>
        {!isLogin && (
          <Route path="/" exact>
            <Redirect to="register" />
          </Route>
        )}

        {!isLogin && (
          <Route path="/register" exact>
            <Register />
          </Route>
        )}
        {!isLogin && (
          <Route path="/login" exact>
            <Login />
          </Route>
        )}
        {isLogin && (
          <Route path="/home" exact>
            <Home />
          </Route>
        )}
        {isLogin && (
          <Route path="*" exact>
            <Redirect to="profile" />
          </Route>
        )}
        {!isLogin && (
          <Route path="*" exact>
            <Redirect to="/" />
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;
