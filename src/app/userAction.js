const createConnectedUserAction = (type) => (connectUser) => ({
    type,
    payload: {
        connectUser /*: {
            email: string,
            password: string
        } */
    }
});

const createDisconnectedUserAction = (type) => ({
    type
})

export const signUp = createConnectedUserAction("USER/SIGN_UP");
export const signIn = createConnectedUserAction("USER/SIGN_IN");
export const signOut = createDisconnectedUserAction("USER/SIGN_OUT");
export const SAVE = { type: "STORAGE/SAVE" };
