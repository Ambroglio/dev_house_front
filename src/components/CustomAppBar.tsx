import {AppBar, Button, Divider, Grid, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import React, {Component} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import CustomLink from "./CustomLink";
import {getMe, logOut} from "../app/userAction";
import {UserState} from "../app/userReducer";
import {useSelector} from "react-redux";
import store, {GlobalState} from "../app/store";
import {AccountCircle} from "@material-ui/icons";
import {red} from "@material-ui/core/colors";
import Toggle from "./Toggle";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    white: {
        color: "white"
    },
    menuItemWithoutLink: {
        "&:hover": {
            backgroundColor: "inherit",
        },
        cursor: "inherit",
        opacity: "1 !important"
    },
}));

type Props = {
    title?: string,
    logInButton?: boolean,
    registerButton?: boolean,
    logOutButton?: boolean,
    optionsButton?: boolean,
    myOffersButton?: boolean
}

export default function CustomAppBar(props: Props) {
    const classes = useStyles();
    const user = useSelector((state: GlobalState) => state.userState.user)

    //menu handler
    const [anchorEl, setAnchorEl] = React.useState(null);

    const openMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar color={"primary"} position="static">
            <Toolbar>
                <Typography variant="h6" component={"h6"} className={classes.title}>
                    <CustomLink to={"/"} className={classes.title}>
                        {props.title ? props.title : "Dev House"}
                    </CustomLink>
                </Typography>
                <Toggle/>
                {!user &&
                <>
                    {
                        (props.logInButton == null || props.logInButton) &&
                        <CustomLink to="/login">
                            <Button color={"inherit"}>
                                Log in
                            </Button>
                        </CustomLink>
                    }
                    {(props.registerButton == null || props.registerButton) &&
                    <CustomLink to="/register">
                        <Button color={"inherit"}>
                            Register
                        </Button>
                    </CustomLink>
                    }
                </>
                }
                {user &&
                <>
                    <IconButton aria-label="profile" onClick={openMenu}>
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                    >
                        <MenuItem className={classes.menuItemWithoutLink} disabled={true}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}><Typography
                                    color={"primary"}>{user.username ? user.username : "Who u ?"}</Typography></Grid>
                                <Grid item xs={12}><Typography>{user.email}</Typography></Grid>
                                <Grid item xs={12}><Divider/></Grid>
                            </Grid>
                        </MenuItem>
                        {(props.myOffersButton == null || props.myOffersButton) &&
                        <CustomLink to={"/offers/me"}>
                            <MenuItem>
                                My offers
                            </MenuItem>
                        </CustomLink>
                        }
                        <MenuItem className={classes.menuItemWithoutLink} disabled={true}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}><Divider/></Grid>
                            </Grid>
                        </MenuItem>
                        {(props.optionsButton == null || props.optionsButton) &&
                        <CustomLink to={"/options"}>
                            <MenuItem>
                                Options
                            </MenuItem>
                        </CustomLink>
                        }
                        {(props.logOutButton == null || props.logOutButton) &&
                        <CustomLink color={"error"} to={"/"} onClick={logOut}>
                            <MenuItem>
                                Log out
                            </MenuItem>
                        </CustomLink>
                        }
                    </Menu>
                </>
                }
            </Toolbar>
        </AppBar>
    )
}