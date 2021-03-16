import CustomBigCard from "./CustomBigCard";
import {Search} from "@material-ui/icons";
import {Grid, TextField, Typography} from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";
import {useSelector} from "react-redux";
import store, {GlobalState} from "../app/store";
import {Loading} from "./Loading";
import {makeStyles} from "@material-ui/core/styles";

// @ts-ignore
import {ReactBingmaps} from 'react-bingmaps';

const useStyles = makeStyles((theme) => ({
    map: {
        height: "500px"
    }
}))

export default function MapCard() {
    const classes = useStyles()

    const loading = useSelector((state: GlobalState) => state.offerState.loading)
    const offers = useSelector((state: GlobalState) => state.offerState.offers)

    const [cityName, setCityName] = React.useState("")
    const [boundary, setBoundary] = React.useState(
        {
            search: "France",
            polygonStyle: {
                fillColor: "rgba(161,224,255,0.4)",
                strokeColor: "#a495b2",
                strokeThickness: 2
            },
            option: {
                entityType: "PopulatedPlace"
            }
        }
    )
    const [fetch, setFetch] = useState(true)

    if (fetch) {
        store.dispatch({
            type: "OFFER/FETCH"
        })

        setFetch(false)
    }

    let pushPins = []

    for (let offer of offers) {
        pushPins[pushPins.length] = {
            location: [offer.latitude, offer.longitude],
            option: {color: "black"}
        }
    }

    function handleCityNameChange(event: ChangeEvent<HTMLInputElement>) {
        const cityNameValue = event.target.value

        setCityName(cityNameValue)
        console.log(cityNameValue)

        if (cityNameValue == "") {
            store.dispatch({
                type: "OFFER/FETCH"
            })
        } else {
            store.dispatch({
                type: "OFFER/FETCH_BY_CITY_NAME",
                payload: {
                    cityName: cityNameValue
                }
            })
        }
    }

    console.log(pushPins)

    //TODO set in properties or .env
    const API_KEY = "ArWdEwy5QEixJgQIeZxYIKGDs6cz6Lqi6QeIMeIvCRB-jFpgzLRWct2gUDvB0nKg"

    return (
        <CustomBigCard
            title={"Map"}
            subheader={"Search an offer now !"}
            avatar={<Search color={"primary"}/>}
            content={
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id={"cityName"}
                            label={"City"}
                            variant={"outlined"}
                            value={cityName}
                            onChange={handleCityNameChange}
                        />
                    </Grid>
                    <Grid item xs={12} id={"mapContainer"} className={classes.map}>
                        {loading &&
                        <Loading/>
                        }
                        {!loading &&
                        <ReactBingmaps
                            bingmapKey={API_KEY}
                            center={[59., 59.]}
                            boundary={boundary}
                            pushPins={pushPins}
                        />
                        }
                    </Grid>
                </Grid>
            }
            footer={
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography color={"primary"}>
                            Offers found
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>
                            {offers.length}
                        </Typography>
                    </Grid>
                </Grid>
            }
        />
    )
}