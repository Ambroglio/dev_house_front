import React from "react";
import CustomAppBar from "../components/CustomAppBar";
import {Box, Card, CardContent, CardHeader, Container, Divider, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {grey} from "@material-ui/core/colors";
import {VpnKey} from "@material-ui/icons";
import LogInForm from "../forms/LogInForm";
import {Link} from "react-router-dom";
import CustomLink from "../components/CustomLink";
import CustomBigCard from "../components/CustomBigCard";

const useStyles = makeStyles({
    link: {
        fontSize: "0.875rem",
    }
});

export default function SignIn() {
    const classes = useStyles();

    return (
        <Box>
            <CustomAppBar title={"Log in"} logInButton={false} registerButton={true}/>

            <Container>
                <Box>
                    <CustomBigCard title={"Log in"}
                                   subheader={"Log in to the application."}
                                   avatar={<VpnKey color={"primary"} />}
                                   content={<LogInForm />}
                                   footer={
                                       <Typography variant={"body2"} color={"textSecondary"}>
                                           You don't have an account ? <CustomLink to={"/register"} color="primary" className={classes.link}>Register</CustomLink> now !
                                       </Typography>
                                   }
                    />
                </Box>
            </Container>
        </Box>
    )
}