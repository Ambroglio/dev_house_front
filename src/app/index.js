import React from "react";
import { Route, Switch } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";

import Home from "../pages/home";
import "./App.css";

const App = () => (
  <Provider store={store}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Provider>
);

export default App;
const Welcome = ({ name } /* déstructurions de props */) => {
  return <h1>Hello, {name}</h1>;
};
