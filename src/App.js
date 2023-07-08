import { Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./component/layout/Nav";
import Register from "./component/Auth/Register";
import Home from "./component/pages/Home";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import Login from "./component/Auth/Login";

function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Redirect to="register" />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
