// @ts-ignore
import S from "sanctuary";
// @ts-ignore
import $ from "sanctuary-def";
import {compose} from "redux";
import {Cmd, liftState, loop} from "redux-loop";
import {UserAction} from "./userAction";
import userApi from "../api/userApi";
import store from "./userStore";

export interface UserState {
    connected: boolean,
    jwt: string | null,
    error: string | null
}

export const initialState = {
    connected: false,
    jwt: null,
    error: null
};

const reducer = (state: UserState = initialState, action: UserAction) => {
    switch (action.type) {
        case "USER/ERROR":
            return {...state, error: action.payload.error};
        case "USER/SIGN_UP":
            //TODO
            console.log("Registering the user !")
            const x =  userApi.registerUser(action.payload.connectUser)
                .then(r => {
                    console.log(r)
                    return "OK"
                })
                .catch(e => {
                    store.dispatch({type: "USER/ERROR", payload: {
                        error: e.response.data.error_message
                    }})
                })
            return state
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