import Box from "@material-ui/core/Box/Box";
import React from "react";
import CustomAppBar from "../../components/CustomAppBar";
import {Button, Container, Typography} from "@material-ui/core";
import CustomBigCard from "../../components/CustomBigCard";
import {Home} from "@material-ui/icons";
import CustomLink from "../../components/CustomLink";
import UnconnectedPage from "../../components/unconnected/UnconnectedPage";

export default function UnconnectedHome() {
    return (
        <UnconnectedPage>
            <CustomAppBar title={"QSI"} logInButton={true} registerButton={true}/>

            <Container>
                <CustomBigCard
                    title={"Welcome !"}
                    subheader={"Welcome to the application."}
                    avatar={<Home color={"primary"}/>}
                    content={
                        <Typography>
                            Log in or register to the application now !
                        </Typography>
                    }
                    footer={
                        <>
                            <CustomLink to="/register">
                                <Button color={"inherit"}>
                                    Register
                                </Button>
                            </CustomLink>
                            <CustomLink to="/login">
                                <Button color={"inherit"}>
                                    Log in
                                </Button>
                            </CustomLink>
                        </>
                    }
                />
            </Container>
        </UnconnectedPage>
    )
}