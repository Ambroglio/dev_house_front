import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import 'fontsource-roboto';

import "./App.css"

import {ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme, CssBaseline} from "@material-ui/core";
import Home from "../pages/home";
// @ts-ignore
import {Provider} from "react-redux";
import store from "./store";
import {light_theme} from "../config/themes";

const App = () => (
    <ThemeProvider theme={createMuiTheme(light_theme)}>
        <Provider store={store}>
        <CssBaseline />
        <Router>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/login"} component={SignIn} />
            <Route exact path={"/register"} component={SignUp} />
        </Router>
        </Provider>
    </ThemeProvider>
);

export default App;