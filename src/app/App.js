import React from "react";
import { Route, Switch } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";

import Home from "../pages/home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import 'fontsource-roboto';

import "./App.css"

const App = () => (
  <Provider store={store}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path={"/login"} component={SignIn} />
      <Route exact path={"/register"} component={SignUp} />
    </Switch>
  </Provider>
);

export default App;
const Welcome = ({ name } /* déstructurions de props */) => {
  return <h1>Hello, {name}</h1>;
};
