import Box from "@material-ui/core/Box/Box";
import React from "react";
import CustomAppBar from "../../components/CustomAppBar";
import {Button, Container, Typography} from "@material-ui/core";
import CustomBigCard from "../../components/CustomBigCard";
import {Face, Home} from "@material-ui/icons";
import CustomLink from "../../components/CustomLink";
import ConnectedPage from "../../components/connected/ConnectedPage";

export default function ConnectedHome() {
    return (
        <ConnectedPage>
            <CustomAppBar title={"QSI"} logOutButton={true}/>

            <Container>
                <CustomBigCard
                    title={"Welcome !"}
                    subheader={"Welcome to the application."}
                    avatar={<Face color={"primary"}/>}
                    content={
                        <Typography>
                            You are now connected !
                        </Typography>
                    }
                    footer={
                        <>

                        </>
                    }
                />
            </Container>
        </ConnectedPage>
    )
}