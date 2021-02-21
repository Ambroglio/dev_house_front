import {Button, Divider, Grid, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {signUp} from "../app/userAction";
import store from "../app/userStore";
import {useSelector} from "react-redux";
import {UserState} from "../app/userReducer";
import { Alert, AlertTitle } from '@material-ui/lab';

export default function RegisterForm() {
    const error = useSelector((state: UserState) => state.error);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    function submit() {
        store.dispatch(signUp({
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }))
    }

    return (
        <>
            <form noValidate autoComplete={"off"}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth id={"email"} label={"Email"} variant="outlined" type={"email"}
                                   onChange={
                                       (event) => {
                                           setEmail(event.target.value)
                                       }
                                   }/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth id={"password"} label={"Password"} type={"password"} variant={"outlined"}
                                   value={password}
                                   onChange={
                                       (event) => {
                                           setPassword(event.target.value)
                                       }
                                   }/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth id={"confirmPassword"} label={"Confirm password"} type={"password"}
                                   variant={"outlined"}
                                   onChange={
                                       (event) => {
                                           setConfirmPassword(event.target.value)
                                       }
                                   }/>
                    </Grid>

                    {error !== null &&
                    <Grid item xs={12}>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            Registration failed — <strong>{error}</strong>
                        </Alert>
                    </Grid>
                    }

                    <Grid item xs={12}>
                        <Button onClick={submit} fullWidth color={"primary"} variant={"contained"}>Register</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}