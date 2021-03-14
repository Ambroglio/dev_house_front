import React, {useState} from "react"
import {Box, Container, Typography} from "@material-ui/core";
import CustomAppBar from "../../components/CustomAppBar";
import CustomBigCard from "../../components/CustomBigCard";
import {Note} from "@material-ui/icons";
import CreateOfferForm from "../../forms/CreateOfferForm";
import ConnectedPage from "../../components/connected/ConnectedPage";
import {Redirect, RouteComponentProps} from "react-router";
import {useSelector} from "react-redux";
import store, {GlobalState} from "../../app/store";
import {Offer as OfferType} from "../../app/offerAction";
import {Loading} from "../../components/Loading";

export default function CreateOffer() {
    return (
        <ConnectedPage>
            <CustomAppBar/>

            <Container>
                <Box>
                    <CustomBigCard
                        title={"Create an offer"}
                        subheader={"Create an offer now !"}
                        avatar={<Note color={"primary"}/>}
                        content={
                            <CreateOfferForm/>
                        }
                    />
                </Box>
            </Container>
        </ConnectedPage>
    )
}