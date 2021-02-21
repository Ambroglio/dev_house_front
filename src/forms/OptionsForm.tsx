import React, {useState} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import {useSelector} from "react-redux";
import {UserState} from "../app/userReducer";

export default function OptionsForm() {
    const user = useSelector((state: UserState) => state.user)

    const [email, setEmail] = useState(user?.email)
    const [username, setUsername] = useState(user?.username)
    const [password, setPassword] = useState("")

    return (
        <>
            <form noValidate autoComplete={"off"}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth id={"email"} label={"Email"} variant="outlined" type={"email"}
                        value={email}
                                   onChange={event=>setEmail(event.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth id={"username"} label={"Username"} type={"text"} variant={"outlined"}
                        value={username}
                        onChange={event=>setUsername(event.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth id={"password"} label={"Password"} type={"password"}
                                   variant={"outlined"} value={password}
                                   onChange={event=>setPassword(event.target.value)}
                        />
                    </Grid>

                    {/*{error !== null &&
                    <Grid item xs={12}>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            Registration failed — <strong>{error}</strong>
                        </Alert>
                    </Grid>
                    }*/}

                    <Grid item xs={12}>
                        <Button fullWidth color={"primary"} variant={"contained"}>Update</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}