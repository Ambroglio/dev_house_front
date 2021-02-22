import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import {useSelector} from "react-redux";
import {UserState} from "../app/userReducer";
import {updateMe, User} from "../app/userAction";

export default function OptionsForm() {
    const user = useSelector((state: UserState) => state.user)
    const error = useSelector((state: UserState) => state.error)
    const successMessage = useSelector((state : UserState) => state.successMessage)
    const id = useSelector((state: UserState) => state.id)
    const jwt = useSelector((state: UserState) => state.jwt)

    const [email, setEmail] = useState(user?.email)
    const [username, setUsername] = useState(user?.username)
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user !== null && loading) {
            setEmail(user?.email)
            setUsername(user?.username)
            setLoading(false)
        }
    },);

    function submit() {
        updateMe(jwt!!, id!!, {
            username: username!!,
            email: email!!,
            password: password
        })
    }

    if (loading) {
        return <></>
    } else {
        return (
            <>
                <form noValidate autoComplete={"off"}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth id={"email"} label={"Email"} variant="outlined" type={"text"}
                                       value={email}
                                       onChange={event => setEmail(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth id={"username"} label={"Username"} type={"text"} variant={"outlined"}
                                       value={username}
                                       onChange={event => setUsername(event.target.value)}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth id={"password"} label={"Password"} type={"password"}
                                       variant={"outlined"} value={password}
                                       onChange={event => setPassword(event.target.value)}
                            />
                        </Grid>

                        {error !== null &&
                        <Grid item xs={12}>
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Update failed — <strong>{error}</strong>
                            </Alert>
                        </Grid>
                        }
                        {successMessage !== null &&
                        <Grid item xs={12}>
                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                {successMessage}
                            </Alert>
                        </Grid>
                        }

                        <Grid item xs={12}>
                            <Button fullWidth color={"primary"} variant={"contained"} onClick={submit}>Update</Button>
                        </Grid>
                    </Grid>
                </form>
            </>
        )
    }
}