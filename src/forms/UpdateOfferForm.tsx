import React, {useState} from "react";
import {
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Select,
    TextField
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// @ts-ignore
import {ReactBingmaps} from 'react-bingmaps';
import {makeStyles} from "@material-ui/core/styles";
import {AccountCircle, Search} from "@material-ui/icons";
import bingApi from "../api/bingApi";
import {CreateOffer} from "../app/offerAction";
import store, {GlobalState} from "../app/store";
import {useSelector} from "react-redux";
import {Loading} from "../components/Loading";
import {Offer} from "../app/offerAction";

const useStyles = makeStyles((theme) => ({
    map: {
        height: "500px"
    }
}))

type Props = {
    offer: Offer
}

export default function UpdateOfferForm({offer} : Props) {
    const classes = useStyles()

    const jwt = useSelector((state: GlobalState) => state.userState.jwt)
    const loading = useSelector((state: GlobalState) => state.offerState.loading)

    //TODO set in properties or .env
    const API_KEY = "ArWdEwy5QEixJgQIeZxYIKGDs6cz6Lqi6QeIMeIvCRB-jFpgzLRWct2gUDvB0nKg"

    const [title, setTitle] = useState(offer.title)
    const [description, setDescription] = useState(offer.description)

    const [validityEndDate, setValidityEndDate] = React.useState(offer.validityEndDate);
    const [cityName, setCityName] = React.useState(offer.cityName)
    const [latitude, setLatitude] = React.useState(offer.latitude)
    const [longitude, setLongitude] = React.useState(offer.longitude)
    const [pin, setPin] = React.useState<any>([
        {
            location: [offer.latitude, offer.longitude],
            option: {color: "black"},
        }
    ])
    const [contractTypeValue, setContractTypeValue] = React.useState<any>(offer.contractType)
    const [companyName, setCompanyName] = React.useState(offer.company.name)
    const [companyDescription, setCompanyDescription] = React.useState(offer.company.description)

    //TODO Contract Period Value
    const [contractPeriodValue, setContractPeriodValue] = React.useState(null)

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

    function searchCityName() {
        setBoundary({
            search: cityName,
            polygonStyle: {
                fillColor: "rgba(161,224,255,0.4)",
                strokeColor: "#a495b2",
                strokeThickness: 2
            },
            option: {
                entityType: "PopulatedPlace"
            }
        })
    }

    function getLocation(location: any) {
        const latitudeValue = location.latitude
        const longitudeValue = location.longitude

        setLatitude(latitudeValue)
        setLongitude(longitudeValue)

        bingApi.getCity(latitudeValue, longitudeValue, API_KEY).then(r => {
            if (r.data.resourceSets[0].estimatedTotal != 0) {
                setCityName(r.data.resourceSets[0].resources[0].address.locality)
            }
        })
        setPin([
            {
                location: [latitudeValue, longitudeValue],
                option: {color: "black"},
            }
        ])
    }

    function submitCreation() {
        const data: CreateOffer = {
            cityName,
            longitude,
            latitude,
            title,
            description,
            companyName,
            companyDescription,
            validityEndDate,
            contractTypeValue
        }

        if (contractPeriodValue != null) {
            data.contractPeriodValue = contractPeriodValue!!
        }

        store.dispatch({
            type: "OFFER/UPDATE",
            payload: {
                jwt: jwt!!,
                data: data,
                id: offer.id
            }
        })

        console.log(data)
    }

    // @ts-ignore
    if (loading) {
        return (<Loading/>)
    } else {
        return (
            <>
                <form noValidate autoComplete={"off"}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth
                                           id={"title"}
                                           label={"Title"}
                                           variant={"outlined"}
                                           type={"text"}
                                           value={title}
                                           onChange={
                                               (event) => {
                                                   setTitle(event.target.value)
                                               }
                                           }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id={"description"}
                                    label={"Description"}
                                    variant={"outlined"}
                                    multiline
                                    value={description}
                                    onChange={
                                        event => {
                                            setDescription(event.target.value)
                                        }
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    id={"company"}
                                    label={"Company"}
                                    variant={"outlined"}
                                    value={companyName}
                                    onChange={
                                        (event) => {
                                            setCompanyName(event.target.value)
                                        }
                                    }
                                />
                            </Grid>

                            {/*TODO CHECK IF NOT EXISTS*/}
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    id={"company"}
                                    label={"Company's description"}
                                    variant={"outlined"}
                                    multiline
                                    onChange={
                                        (event) => {
                                            setCompanyDescription(event.target.value)
                                        }
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>

                            <Grid item xs={12}>
                                <KeyboardDatePicker
                                    fullWidth
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Offer valid until"
                                    format="yyyy-MM-dd"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    inputVariant={"outlined"}
                                    onChange={date => setValidityEndDate(date!!)}
                                    value={validityEndDate}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-contractType-native-simple">Contract Type</InputLabel>
                                    <Select
                                        native
                                        value={contractTypeValue}
                                        onChange={event => setContractTypeValue(event.target.value)}
                                        label="Contract Type"
                                        inputProps={{
                                            name: 'Contract Type',
                                            id: 'outlined-contractType-native-simple',
                                        }}
                                    >
                                        <option value={"CDI"}>CDI</option>
                                        <option value={"CDD"}>CDD</option>
                                        <option value={"INTERIM"}>Interim</option>
                                        <option value={"CONTRAT_PRO"}>Contrat pro</option>
                                        <option value={"APPRENTISSAGE"}>Apprentissage</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {contractTypeValue !== "CDI" &&
                            <>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        id={"amount"}
                                        label={"Amount"}
                                        variant={"outlined"}
                                        type={"number"}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-periodType-native-simple">Period Type</InputLabel>
                                        <Select
                                            native
                                            label="Contract Type"
                                            inputProps={{
                                                name: 'Contract Type',
                                                id: 'outlined-periodType-native-simple',
                                            }}
                                        >
                                            <option value={"Y"}>Years</option>
                                            <option value={"M"}>Months</option>
                                            <option value={"D"}>Days</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </>
                            }

                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id={"cityName"}
                                    label={"City Name"}
                                    variant={"outlined"}
                                    onChange={event => setCityName(event.target.value)}
                                    value={cityName}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={searchCityName}>
                                                    <Search/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.map} id={"mapContainer"}>
                                <ReactBingmaps
                                    bingmapKey={API_KEY}
                                    center={[latitude, longitude]}
                                    boundary={boundary}
                                    getLocation={{
                                        addHandler: "click",
                                        callback: getLocation
                                    }}
                                    pushPins={pin}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth color={"primary"} variant={"contained"}
                                        onClick={submitCreation}>
                                    Update offer
                                </Button>
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </form>
            </>
        )
    }
}
