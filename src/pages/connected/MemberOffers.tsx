import React from "react";
import ConnectedPage from "../../components/connected/ConnectedPage";
import CustomAppBar from "../../components/CustomAppBar";

type Props = {
    me?: boolean
}

export default function MemberOffers(props: Props) {
    return (
        <ConnectedPage>
            <CustomAppBar />
        </ConnectedPage>
    )
}