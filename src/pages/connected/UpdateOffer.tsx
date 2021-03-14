import React, {useState} from "react";
import CustomAppBar from "../../components/CustomAppBar";
import {Container} from "@material-ui/core";
import CustomBigCard from "../../components/CustomBigCard";
import {Note} from "@material-ui/icons";
import ConnectedPage from "../../components/connected/ConnectedPage";
import UpdateOfferForm from "../../forms/UpdateOfferForm";
import {useSelector} from "react-redux";
import store, {GlobalState} from "../../app/store";
import {Offer as OfferType} from "../../app/offerAction";
import {Redirect, RouteComponentProps} from "react-router";

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {

}

export default function UpdateOffer({match}: Props) {
    const id = match.params.id
    const [fetch, setFetch] = useState(true)

    const loading = useSelector((state: GlobalState) => state.offerState.loading)
    const offers = useSelector((state: GlobalState) => state.offerState.offers)
    const userId = useSelector((state: GlobalState) => state.userState.id)

    let offer: OfferType | null = null

    if (offers.length > 0) {
        offer = offers[0]
    }

    if (fetch) {
        store.dispatch({
            type: "OFFER/FETCH_BY_ID",
            payload: {
                id
            }
        })

        setFetch(false)
    }

    if (userId == null) {
        return <Redirect to={"/"} />
    }

    if (!fetch && !loading && (offer == null || offer.memberId != userId)) {
        return <Redirect to={"/offers/me"} />
    }

    return (
        <ConnectedPage>
            <CustomAppBar/>

            <Container>
                <CustomBigCard
                    title={`Update ${offer!!.title}`}
                    subheader={"Update the offer."}
                    avatar={<Note color={"primary"}/>}
                    content={
                        <UpdateOfferForm offer={offer!!} />
                    }
                />
            </Container>
        </ConnectedPage>
    )
}