import {Button, Divider, Grid, TextField} from "@material-ui/core";
import React from "react";

export default function LogInForm() {
    return (
        <form noValidate autoComplete={"off"}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth id={"email"} label={"Email"} variant="outlined" type={"email"}/>
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth id={"password"} label={"Password"} type={"password"} variant={"outlined"}/>
                </Grid>

                <Grid item xs={12}>
                    <Button fullWidth color={"primary"} variant={"contained"}>Log in</Button>
                </Grid>
            </Grid>
        </form>
    )
}