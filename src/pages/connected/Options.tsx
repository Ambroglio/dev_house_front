import React from "react";
import ConnectedPage from "../../components/connected/ConnectedPage";
import CustomAppBar from "../../components/CustomAppBar";
import {Box, Button, Container, Typography} from "@material-ui/core";
import {Face, Settings} from "@material-ui/icons";
import CustomBigCard from "../../components/CustomBigCard";
import OptionsForm from "../../forms/OptionsForm";
import {deleteMe} from "../../app/userAction";
import {useSelector} from "react-redux";
import {UserState} from "../../app/userReducer";

export default function Options() {
    const id = useSelector((state: UserState) => state.id)!!
    const jwt = useSelector((state: UserState) => state.jwt)!!

    return (
        <ConnectedPage>
            <CustomAppBar title={"QSI"} logOutButton={true} optionsButton={true}/>

            <Container>
                <Box>
                    <CustomBigCard
                        title={"Options"}
                        subheader={"Update your profile here."}
                        avatar={<Settings color={"primary"}/>}
                        content={
                            <OptionsForm />
                        }
                        footer={
                            <Button variant={"contained"} color={"secondary"} onClick={e => deleteMe(jwt, id)}>
                                Delete account
                            </Button>
                        }
                    />
                </Box>
            </Container>
        </ConnectedPage>
    )
}