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
            contrastText: "#000"
        },
        secondary: {
            main: grey[200],
            contrastText: "#000"
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
            main: '#a82f2f',
            contrastText: '#fff',
        },
        secondary: {
            main: grey[200],
            contrastText: "#000"
        }
    },
}