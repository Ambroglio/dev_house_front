import React from "react";
import CustomAppBar from "../components/CustomAppBar";
import {Box, Container, Typography} from "@material-ui/core";
import CustomBigCard from "../components/CustomBigCard";
import {Looks, PermIdentity, VpnKey} from "@material-ui/icons";
import LogInForm from "../forms/LogInForm";
import CustomLink from "../components/CustomLink";
import RegisterForm from "../forms/RegisterForm";
import {makeStyles} from "@material-ui/core/styles";
import {register} from "../serviceWorkerRegistration";

const useStyles = makeStyles({
    link: {
        fontSize: "0.875rem",
    }
});

export default function SignUp() {
    const classes = useStyles();

    return (
        <Box>
            <CustomAppBar title={"Register"} logInButton={true} registerButton={false}/>
            <Container>
                <Box>
                    <CustomBigCard title={"Register"}
                                   subheader={"Register on the application."}
                                   avatar={<Looks color={"primary"} />}
                                   content={<RegisterForm />}
                                   footer={
                                       <Typography variant={"body2"} color={"textSecondary"}>
                                           You already have an account ? <CustomLink to={"/login"} color="primary" className={classes.link}>Log in</CustomLink> now !
                                       </Typography>
                                   }
                    />
                </Box>
            </Container>
        </Box>
    )
}