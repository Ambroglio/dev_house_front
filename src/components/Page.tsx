import React, {ReactNode} from "react";
import {Box} from "@material-ui/core";

type Props = {
    children: ReactNode
}

export default function Page({children} : Props) {
    return (
        <Box>
            {children}
        </Box>
    )
}