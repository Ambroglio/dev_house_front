import React, {ReactNode} from "react";
import {useSelector} from "react-redux";
import {UserState} from "../../app/userReducer";
import {Box} from "@material-ui/core";
import {Redirect} from "react-router";
import {GlobalState} from "../../app/store";

type Props = {
    children: ReactNode,
}

export default function UnconnectedPage({children} : Props) {
    const connected = useSelector((state: GlobalState) => state.userState.connected)

    console.log("UNCONNECTED PAGE : " + connected)

    if (!connected) {
        return (
            <Box>
                {children}
            </Box>
        )
    } else {
        return (
            <Redirect to={"/"} />
        )
    }
}