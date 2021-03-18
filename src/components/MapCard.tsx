import CustomBigCard from "./CustomBigCard";
import {ExpandMore, Search} from "@material-ui/icons";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";
import {useSelector} from "react-redux";
import store, {GlobalState} from "../app/store";
import {Loading} from "./Loading";
import {makeStyles} from "@material-ui/core/styles";

// @ts-ignore
import {ReactBingmaps} from 'react-bingmaps';
import CustomLink from "./CustomLink";
import {Autocomplete} from "@material-ui/lab";
import offerApi from "../api/offerApi";

const useStyles = makeStyles((theme) => ({
    map: {
        height: "500px"
    },
    mapOffers: {
        height: "500px",
        overflow: "auto"
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
    const [loadingCities, setLoadingCities] = useState(true)
    const [cities, setCities] = useState([])
    const [position, setPosition] = useState([60, 60])
    const [zoom, setZoom] = useState(10)

    if (fetch) {
        store.dispatch({
            type: "OFFER/FETCH"
        })

        offerApi.getCities()
            .then(r => {
                setLoadingCities(false)
                setCities(r.data)
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

    function handleCityNameChange(value : string | null) {
        const cityNameValue = value

        if (cityNameValue == null) {
            setCityName("")
        } else {
            setCityName(cityNameValue)
        }

        setBoundary({
            search: "France",
            polygonStyle: {
                fillColor: "rgba(161,224,255,0.4)",
                strokeColor: "#a495b2",
                strokeThickness: 2
            },
            option: {
                entityType: "PopulatedPlace"
            }
        })

        setZoom(10)

        if (cityNameValue == null || cityNameValue == "") {
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
                        <Autocomplete
                            freeSolo
                            renderInput={(params) => <TextField {...params} fullWidth label="City" variant="outlined" value={cityName} />}
                            options={cities}
                            value={cityName}
                            onChange={(event, value) => handleCityNameChange(value)}
                            inputValue={cityName}
                            onInputChange={(event, newInputValue) => handleCityNameChange(newInputValue)}
                        />
                    </Grid>
                    <Grid item xs={12} id={"mapContainer"}>
                        {(loading || loadingCities) &&
                        <Loading/>
                        }
                        {(!loading && !loadingCities) &&
                        <Grid container spacing={2}>
                            <Grid item xs={5} className={classes.mapOffers}>
                                {offers.map((item) => {
                                    return (
                                        <Accordion onClick={(event) => {
                                            setPosition([item.latitude, item.longitude])
                                            setBoundary(
                                            //@ts-ignore
                                            {})
                                            setZoom(13)
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMore/>}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Grid container spacing={2}>
                                                    <Grid item xs={9}>
                                                        <Typography>{item.title}</Typography>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography align={"right"}>
                                                            @{item.company.name} in {item.cityName}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography color={"primary"}>{item.contractType}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Typography>
                                                            {item.description}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider/>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <CustomLink to={`/offers/get/${item.id}`}>
                                                            <Button color={"secondary"} variant={"contained"}>
                                                                See offer
                                                            </Button>
                                                        </CustomLink>
                                                    </Grid>
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}
                            </Grid>
                            <Grid item xs={7} className={classes.map}>
                                <ReactBingmaps
                                    bingmapKey={API_KEY}
                                    center={position}
                                    boundary={boundary}
                                    pushPins={pushPins}
                                    zoom={zoom}
                                />
                            </Grid>
                        </Grid>
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
                        <Typography align={"right"}>
                            {offers.length}
                        </Typography>
                    </Grid>
                </Grid>
            }
        />
    )
}