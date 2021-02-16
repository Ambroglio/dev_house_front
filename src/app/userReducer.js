import S from "sanctuary";
import $ from "sanctuary-def";
import { SAVE } from "./userAction";
import { compose } from "redux";
import { liftState, loop, Cmd } from "redux-loop";

export const initialState = {
    connected: false,
    jwt: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "STORAGE/SAVE":
            const jwt = S.fromMaybe(null)(S.get(S.is($.String))("jwt")(state));
            localStorage.setItem("jwt", jwt);
            return state;
        case "USER/SIGN_UP":
            //TODO
            return state;
        case "USER/SIGN_IN":
            //TODO
            return state;
        case "USER/SIGN_OUT":
            //TODO
            return state;
        default:
            return state;
    }
}

export default compose(liftState, reducer);