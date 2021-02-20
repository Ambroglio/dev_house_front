import store from "./userStore";

export interface ConnectUser {
    email: string,
    password: string,
    confirmPassword?: string
}

export interface User {
    username: string,
    email: string
}

export type UserActionType =
    | "USER/SIGN_UP"
    | "USER/SIGN_IN"

export type UserMemberType =
    | "USER/SET_MEMBER"

export type UserWithoutPayloadType =
    | "USER/NAVIGATE"
    | "USER/LOG_OUT"

export type UserErrorType =
    | "USER/ERROR"

export type UserJwtType =
    | "USER/VERIFY_JWT"

export type UserConnectedType =
    | "USER/SET_CONNECTED"
    | "USER/GET_ME"


export type UserAction = {
    type: UserActionType,
    payload: {
        connectUser: ConnectUser
    }
} | {
    type: UserErrorType,
    payload: {
        error: string
    }
} | {
    type: UserWithoutPayloadType
} | {
    type: UserJwtType,
    payload: {
        jwt: string
    }
} | {
    type: UserConnectedType,
    payload: {
        jwt: string
        id: string
    }
} | {
    type: UserMemberType,
    payload: {
        user: User
    }
}

const createConnectedUserAction = (type: UserActionType) => (connectUser: ConnectUser) => ({
    type,
    payload: {
        connectUser
    }
});

export const signUp = createConnectedUserAction("USER/SIGN_UP");
export const signIn = createConnectedUserAction("USER/SIGN_IN");

export function navigate() {
    store.dispatch({type: "USER/NAVIGATE"})
}

export function logOut() {
    store.dispatch({type: "USER/LOG_OUT"})
}

export function getMe(jwt: string, id: string) {
    store.dispatch({
        type: "USER/GET_ME",
        payload: {
            jwt,
            id
        }
    })
}