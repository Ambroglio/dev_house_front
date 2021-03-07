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

export const dark_theme = {
    palette: {
        type: "dark" as PaletteType,
        background: {
            default: grey[500]
        },
        primary: {
            main: '#212121',
            contrastText: '#fff',
        }
    },
}