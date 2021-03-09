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
import store from "./store";
import {light_theme, dark_theme} from "../config/themes";
import AppRouter from "../routing/AppRouter";
import {AppThemeContext, AppThemeProvider} from "../context/AppThemeContext";

export default function App() {
    return (
        <AppThemeProvider>
            <AppThemeContext.Consumer>{
                theme => {
                    let muiTheme = createMuiTheme(light_theme);
                    if (theme.theme === "dark") {
                        muiTheme = createMuiTheme(dark_theme);
                    }

                    return (<ThemeProvider theme={muiTheme}>
                        <CssBaseline/>
                        <Provider store={store}>
                            <CssBaseline/>
                            <AppRouter/>
                        </Provider>
                    </ThemeProvider>)
                }
            }
            </AppThemeContext.Consumer>
        </AppThemeProvider>
    );
}