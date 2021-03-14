import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        textAlign: "center",
        justifyContent: "center",
        marginTop: theme.spacing(2)
    },
}));

export function Loading () {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CircularProgress/>
        </div>
    )
}