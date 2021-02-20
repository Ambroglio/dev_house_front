import {Link} from "react-router-dom";
import {Typography, TypographyProps} from "@material-ui/core";
import React, {ComponentProps} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {navigate} from "../app/userAction";

interface Props extends TypographyProps {
    to: string,
    children: React.ReactNode
}

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        '&:active': {
            color: "inherit"
        },
        color: "inherit"
    }
}));

export default function CustomLink({to, children, ...props}: Props) {
    const classes = useStyles();

    return (
        <Link to={to} className={classes.link} onClick={navigate}>
            <Typography {...props} component={"span"}>{children}</Typography>
        </Link>
    )
}