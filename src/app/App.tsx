import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import SignIn from "../pages/unconnected/SignIn";
import SignUp from "../pages/unconnected/SignUp";
import 'fontsource-roboto';

import "./App.css"

import {ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme, CssBaseline} from "@material-ui/core";
// @ts-ignore
import {Provider} from "react-redux";
import store from "./userStore";
import {light_theme} from "../config/themes";
import AppRouter from "../routing/AppRouter";

export default function App() {
    return (
        <ThemeProvider theme={createMuiTheme(light_theme)}>
            <Provider store={store}>
                <CssBaseline/>
                <AppRouter />
            </Provider>
        </ThemeProvider>
    )
}