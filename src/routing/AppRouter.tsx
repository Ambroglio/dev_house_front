import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignIn from "../pages/unconnected/SignIn";
import SignUp from "../pages/unconnected/SignUp";
import {useSelector} from "react-redux";
import {UserState} from "../app/userReducer";
import UnconnectedHome from "../pages/unconnected/UnconnectedHome";
import { Redirect } from 'react-router'
import ConnectedHome from "../pages/connected/ConnectedHome";
import store from "../app/userStore";
import {getMe} from "../app/userAction";
import Options from "../pages/connected/Options";

export default function AppRouter() {
    const connected = useSelector((state: UserState) => state.connected);
    const jwt = useSelector((state: UserState) => state.jwt);
    const id = useSelector((state : UserState) => state.id)

    if (jwt != null && id != null) {
        //checking if token is still valid
        store.dispatch({
            type: "USER/VERIFY_JWT", payload: {jwt: jwt}
        })
        getMe(jwt, id)
    }

    if (!connected) {
        //UNCONNECTED ROUTER
        return (
            <Router>
                <Switch>
                    <Route exact path={"/"} component={UnconnectedHome} />
                    <Route exact path={"/login"} component={SignIn} />
                    <Route exact path={"/register"} component={SignUp}></Route>
                    <Route><Redirect to={"/"} /></Route>
                </Switch>
            </Router>
        )
    } else {
        //CONNECTED ROUTER
        return (
            <Router>
                <Switch>
                    <Route exact path={"/"} component={ConnectedHome} />
                    <Route exact path={"/options"} component={Options} />
                    <Route><Redirect to={"/"} /></Route>
                </Switch>
            </Router>
        )
    }
}