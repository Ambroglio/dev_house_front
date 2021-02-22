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

export interface UpdateUser {
    email: string,
    username: string,
    password: string,
}

export type UserActionType =
    | "USER/SIGN_UP"
    | "USER/SIGN_IN"

export type UserMemberType =
    | "USER/SET_MEMBER"

export type UserWithoutPayloadType =
    | "USER/NAVIGATE"
    | "USER/LOG_OUT"

export type UserMessageType =
    | "USER/ERROR"
    | "USER/SUCCESS"

export type UserJwtType =
    | "USER/VERIFY_JWT"

export type UserConnectedType =
    | "USER/SET_CONNECTED"
    | "USER/GET_ME"
    | "USER/DELETE_ME"

export type UserUpdateType =
    | "USER/UPDATE"

export type UserAction = {
    type: UserActionType,
    payload: {
        connectUser: ConnectUser
    }
} | {
    type: UserMessageType,
    payload: {
        message: string,
        user?: User
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
} | {
    type: UserUpdateType,
    payload: {
        jwt: string,
        id: string
        user: UpdateUser
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

export function deleteMe(jwt: string, id: string) {
    store.dispatch({
        type: "USER/DELETE_ME",
        payload: {
            jwt,
            id
        }
    })
}

export function updateMe(jwt: string, id: string, user: UpdateUser) {
    store.dispatch({
        type: "USER/UPDATE",
        payload: {
            jwt,
            id,
            user
        }
    })
}