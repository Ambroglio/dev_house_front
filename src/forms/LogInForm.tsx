import {Button, Divider, Grid, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {signIn} from "../app/userAction";
import store from "../app/store";
import {useSelector} from "react-redux";
import {UserState} from "../app/userReducer";
import {Alert, AlertTitle} from "@material-ui/lab";

export default function LogInForm() {
    const error = useSelector((state: UserState) => state.error);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function submit() {
        store.dispatch(signIn({
            email: email,
            password: password
        }))
    }

    return (
        <>
            <form noValidate autoComplete={"off"}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth id={"email"} label={"Email"} variant="outlined"
                                   type={"email"}
                                   value={email}
                                   onChange={
                                       (event) => {
                                           setEmail(event.target.value)
                                       }
                                   }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth id={"password"} label={"Password"} type={"password"}
                                   variant={"outlined"}
                                   value={password}
                                   onChange={
                                       (event) => {
                                           setPassword(event.target.value)
                                       }
                                   }
                        />
                    </Grid>

                    {error !== null &&
                    <Grid item xs={12}>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            Connection failed — <strong>{error}</strong>
                        </Alert>
                    </Grid>
                    }

                    <Grid item xs={12}>
                        <Button fullWidth color={"primary"} variant={"contained"}
                                onClick={submit}
                        >
                            Log in
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}