import {makeStyles} from "@material-ui/core/styles";
import {grey} from "@material-ui/core/colors";
import {Box, Card, CardContent, CardHeader, Container, Divider, Typography} from "@material-ui/core";
import CustomAppBar from "./CustomAppBar";
import {VpnKey} from "@material-ui/icons";
import LogInForm from "../forms/LogInForm";
import CustomLink from "./CustomLink";
import React from "react";

const useStyles = makeStyles({
    root: {
        minWidth: 600,
        margin: "20px 0",
    }
});

interface Props {
    title: string,
    subheader: string,
    avatar: React.ReactNode,
    content: React.ReactNode,
    footer: React.ReactNode
}

export default function CustomBigCard({title, subheader, avatar, content, footer} : Props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader avatar={avatar} title={title} subheader={subheader}/>
            <Divider />
            <CardContent>
                {content}
            </CardContent>
            <Divider />
            <CardContent>
                {footer}
            </CardContent>
        </Card>
    )
}