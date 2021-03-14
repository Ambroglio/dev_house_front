import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignIn from "../pages/unconnected/SignIn";
import SignUp from "../pages/unconnected/SignUp";
import {useSelector} from "react-redux";
import {UserState} from "../app/userReducer";
import UnconnectedHome from "../pages/unconnected/UnconnectedHome";
import { Redirect } from 'react-router'
import ConnectedHome from "../pages/connected/ConnectedHome";
import store, {GlobalState} from "../app/store";
import {getMe} from "../app/userAction";
import Options from "../pages/connected/Options";
import MemberOffers from "../pages/connected/MemberOffers";
import CreateOffer from "../pages/connected/CreateOffer";
import Offer from "../pages/global/Offer";
import UpdateOffer from "../pages/connected/UpdateOffer";

export default function AppRouter() {
    const connected = useSelector((state: GlobalState) => {
        return state.userState.connected});
    const jwt = useSelector((state: GlobalState) => state.userState.jwt);
    const id = useSelector((state : GlobalState) => state.userState.id)

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
                    <Route exact path={"/register"} component={SignUp} />
                    <Route exact path={"/offers/get/:id"} component={Offer} />
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
                    <Route exact path={"/offers/me"}>
                        <MemberOffers me={true} />
                    </Route>
                    <Route exact path={"/offers/get/:id"} component={Offer} />
                    <Route exact path={"/offers/:id/update"} component={UpdateOffer} />
                    <Route exact path={"/offers/create"} component={CreateOffer} />
                    <Route><Redirect to={"/"} /></Route>
                </Switch>
            </Router>
        )
    }
}