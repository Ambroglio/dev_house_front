import React from "react";
import {Switch} from "@material-ui/core";
import {NightsStay, WbSunny} from "@material-ui/icons";
import {withStyles} from "@material-ui/styles";
import {AppThemeContext} from "../context/AppThemeContext";

const ToggleSwitch = withStyles((theme) => (
    {
    switchBase: {
        color: theme.palette.primary.contrastText,
        '&$checked': {
            color: theme.palette.primary.contrastText,
        },
        '&$checked + $track': {
            backgroundColor: theme.palette.primary.contrastText
        },
    },
    checked: {},
    track: {},
}))(Switch);

export default function Toggle() {
    return (
        <AppThemeContext.Consumer>
            {theme => {
                return (<ToggleSwitch
                    checked={theme.theme === "light"}
                    onChange={theme.toggleTheme}
                    checkedIcon={<WbSunny/>}
                    icon={<NightsStay/>}
                />)
            }
            }
        </AppThemeContext.Consumer>
    )
}