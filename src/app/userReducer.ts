// @ts-ignore
import S from "sanctuary";
// @ts-ignore
import $ from "sanctuary-def";
import {compose} from "redux";
import {Cmd, liftState, loop} from "redux-loop";
import {User, UserAction} from "./userAction";
import userApi from "../api/userApi";
import store from "./userStore";

export interface UserState {
    connected: boolean,
    jwt: string | null,
    id: string | null
    error: string | null,
    successMessage: string | null
    user: User | null
}

const initialState = {
    connected: false,
    jwt: null,
    error: null,
    successMessage: null,
    id: null,
    user: null
};

export function loadState() {
    const connectedString = localStorage.getItem("connected")
    const jwt = localStorage.getItem("jwt")
    const id = localStorage.getItem("id")

    let connected = false

    if (connectedString != null)
        connected = true

    return {...initialState, connected: connected, jwt: jwt, id: id}
}

const reducer = (state: UserState, action: UserAction) => {
    let jwt = ""
    let id = ""

    switch (action.type) {
        case "USER/ERROR":
            return {...state, error: action.payload.message, successMessage: null};
        case "USER/SIGN_UP":
            console.log("Registering the user !")
            userApi.registerUser(action.payload.connectUser)
                .then(r => {
                    store.dispatch({
                        //logging in in order to get jwt !
                        type: "USER/SIGN_IN", payload: {
                            connectUser: {
                                email: action.payload.connectUser.email,
                                password: action.payload.connectUser.password
                            }
                        }
                    })
                })
                .catch(e => {
                    store.dispatch({
                        type: "USER/ERROR", payload: {
                            message: e.response.data.error_message
                        }
                    })
                })
            return state;
        case "USER/SIGN_IN":
            console.log("User is logging in...")

            userApi.loginUser(action.payload.connectUser)
                .then(r => {
                    //dispatch jwt
                    const jwt = r.data.jwt
                    store.dispatch({
                        //set jwt
                        type: "USER/VERIFY_JWT",
                        payload: {
                            jwt: jwt
                        }
                    })
                })
                .catch(e => {
                    store.dispatch({
                        type: "USER/ERROR", payload: {
                            message: e.response.data.error_message
                        }
                    })
                })
            return state;
        case "USER/LOG_OUT":
            localStorage.removeItem("connected")
            localStorage.removeItem("jwt")
            localStorage.removeItem("id")
            return {...state, connected: false, jwt: null, id: null, user: null};
        case "USER/NAVIGATE":
            return {...state, error: null, successMessage: null}
        case "USER/VERIFY_JWT":
            jwt = action.payload.jwt
            userApi.verifyJwt(jwt)
                .then(r => {
                    store.dispatch({
                        type: "USER/SET_CONNECTED",
                        payload: {
                            jwt,
                            id: r.data.user_id
                        }
                    })
                })
                .catch(e => {
                    store.dispatch({
                        type: "USER/LOG_OUT"
                    })
                })
            return state
        case "USER/SET_CONNECTED":
            jwt = action.payload.jwt
            id = action.payload.id

            localStorage.setItem("connected", "")
            localStorage.setItem("jwt", jwt)
            localStorage.setItem("id", id)
            return {...state, connected: true, jwt: jwt, id: id}
        case "USER/GET_ME":
            jwt = action.payload.jwt
            id = action.payload.id

            userApi.getMember(id, jwt)
                .then(r => {
                    store.dispatch({
                        type: "USER/SET_MEMBER", payload: {
                            user: {
                                email: r.data.email,
                                username: r.data.username
                            }
                        }
                    })
                })
                .catch(e => {
                    store.dispatch({type: "USER/LOG_OUT"})
                })

            return state;
        case "USER/DELETE_ME":
            jwt = action.payload.jwt
            id = action.payload.id

            userApi.deleteMember(id, jwt)
                .then(r => {
                    store.dispatch({type: "USER/LOG_OUT"})
                })
                .catch(e => {
                    store.dispatch({
                        type: "USER/ERROR", payload: {
                            message: e.response.data.error_message
                        }
                    })
                })
            return state
        case "USER/UPDATE":
            userApi.updateMember(action.payload.id, action.payload.jwt, action.payload.user)
                .then(r => store.dispatch({
                    type: "USER/SUCCESS", payload: {
                        message: "User successfully updated",
                        user: {
                            email: action.payload.user.email,
                            username: action.payload.user.username
                        }
                    }
                }))
                .catch(e => store.dispatch({
                    type: "USER/ERROR",
                    payload: {
                        message: e.response.data.error_message
                    }
                }))

            return state
        case "USER/SUCCESS":
            return {...state, user: action.payload.user? action.payload.user : state.user, successMessage: action.payload.message, error: null}
        case "USER/SET_MEMBER":
            return {...state, user: action.payload.user}
        default:
            return state;
    }

}


export default compose(liftState, reducer);