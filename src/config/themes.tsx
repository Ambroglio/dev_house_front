import {PaletteType} from "@material-ui/core";
import {blue, green, grey, orange, purple, red} from "@material-ui/core/colors";

export const light_theme = {
    palette: {
        type: "light" as PaletteType,
        background: {
            default: grey[100]
        },
        primary: {
            main: green[300],
            contrastText: "black"
        }
    },

}