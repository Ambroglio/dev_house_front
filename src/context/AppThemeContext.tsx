import React, {ReactChildren, ReactNode, useState} from "react";

export const AppThemeContext = React.createContext({theme: "dark", toggleTheme: () => {}});

type Props = {
    children : ReactNode
}

type themes =
    | "dark"
    | "light"

export function AppThemeProvider(props : Props) {
    let savedTheme : string | null = localStorage.getItem("theme")
    let themeContent : themes = "light"

    if (savedTheme != null) {
        themeContent = (savedTheme as themes)
    } else {
        //check if prefered color scheme is dark
        if (window.matchMedia) {
            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                themeContent = "dark"
            } else {
                themeContent = "light"
            }
        } else {
            themeContent = "light"
        }
    }

    const [theme, setTheme] = useState<themes>(themeContent);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }

    return (
        <AppThemeContext.Provider value={
            {theme: theme,
                toggleTheme: toggleTheme
            }}
        >
            {props.children}
        </AppThemeContext.Provider>
    )
}