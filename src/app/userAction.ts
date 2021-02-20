export interface ConnectUser {
    email: string,
    password: string,
    confirmPassword?: string
}

export type UserActionType =
    | "USER/SIGN_UP"
    | "USER/SIGN_IN"
    | "USER/SIGN_OUT"

export type UserErrorType =
    | "USER/ERROR"

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
}

const createConnectedUserAction = (type: UserActionType) => (connectUser: ConnectUser) => ({
    type,
    payload: {
        connectUser
    }
});

const createDisconnectedUserAction = (type: UserActionType) => ({
    type
})

export const signUp = createConnectedUserAction("USER/SIGN_UP");
export const signIn = createConnectedUserAction("USER/SIGN_IN");
export const signOut = createDisconnectedUserAction("USER/SIGN_OUT");
export const SAVE = {type: "STORAGE/SAVE"};
