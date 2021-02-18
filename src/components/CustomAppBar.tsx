import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import React, {Component} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import CustomLink from "./CustomLink";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    white: {
        color: "white"
    }
}));

interface Props {
    title: string,
    logInButton: boolean,
    registerButton: boolean
}

export default function CustomAppBar(props: Props) {
    const classes = useStyles();

    return (
        <AppBar color={"primary"} position="static">
            <Toolbar>
                <Typography variant="h6" component={"h6"} className={classes.title}>
                    {props.title}
                </Typography>
                {props.logInButton &&
                <CustomLink to="/login">
                    <Button color={"inherit"}>
                        Log in
                    </Button>
                </CustomLink>
                }
                {props.registerButton &&
                <CustomLink to="/register">
                    <Button color={"inherit"}>
                        Register
                    </Button>
                </CustomLink>
                }
            </Toolbar>
        </AppBar>
    )
}