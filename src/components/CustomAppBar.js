import {AppBar, Toolbar, Typography} from "@material-ui/core";
import React, {Component} from "react";

class CustomAppBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar color={"primary"} position="static">
                <Toolbar>
                    <Typography variant="h6" component={"h6"}>
                        {this.props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default CustomAppBar;