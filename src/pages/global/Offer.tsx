import React, {useState} from "react";
import {Redirect, RouteComponentProps} from 'react-router';
import Page from "../../components/Page";
import CustomAppBar from "../../components/CustomAppBar";
import store, {GlobalState} from "../../app/store";
import {useSelector} from "react-redux";
import {Loading} from "../../components/Loading";
import {Box, Button, Container, Divider, Grid, Typography} from "@material-ui/core";
import {Offer as OfferType} from "../../app/offerAction";
import {Note} from "@material-ui/icons";
import CustomBigCard from "../../components/CustomBigCard";
import CustomLink from "../../components/CustomLink";
// @ts-ignore
import {ReactBingmaps} from 'react-bingmaps';
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";

interface MatchParams {
    id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

const useStyles = makeStyles((theme) => ({
    map: {
        height: "500px"
    },
    deleteButton: {
        backgroundColor: red[400],
        marginLeft: theme.spacing(2),
        "&:hover": {
            backgroundColor: red[500]
        }
    }
}))

export default function Offer({match}: Props) {
    const classes = useStyles()

    const id = match.params.id
    const [fetch, setFetch] = useState(true)
    const loading = useSelector((state: GlobalState) => state.offerState.loading)
    const offers = useSelector((state: GlobalState) => state.offerState.offers)
    const userId = useSelector((state: GlobalState) => state.userState.id)
    const jwt = useSelector((state: GlobalState) => state.userState.jwt)

    //TODO set in properties or .env
    const API_KEY = "ArWdEwy5QEixJgQIeZxYIKGDs6cz6Lqi6QeIMeIvCRB-jFpgzLRWct2gUDvB0nKg"

    let offer: OfferType | null = null

    if (offers.length > 0) {
        offer = offers[0]
    }

    if (fetch) {
        store.dispatch({
            type: "OFFER/FETCH_BY_ID",
            payload: {
                id
            }
        })

        setFetch(false)
    }

    if (!fetch && !loading && (offer == null || !offer.valid || (offer.validityEndDate < new Date()))) {
        return <Redirect to={"/"}/>
    }

    return (
        <Page>
            <CustomAppBar/>

            <Container>
                <Box>

                    {loading &&
                    <Loading/>
                    }
                    {(!loading && offer != null) &&
                    <>
                        {userId != null && userId == offer!!.memberId &&
                        <CustomBigCard title={offer!!.title}
                                       subheader={"The following describes the offer."}
                                       avatar={<Note color={"primary"}/>}
                                       content={
                                           <Grid container spacing={2}>
                                               <Grid item xs={12}>
                                                   <Typography>
                                                       {offer!!.description}
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12}>
                                                   <Divider/>
                                               </Grid>
                                               <Grid item xs={3}>
                                                   <Typography color={"primary"}>
                                                       Company
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={9}>
                                                   <Typography>
                                                       {offer!!.company.name}
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={3}/>
                                               <Grid item xs={9}>
                                                   <Typography>
                                                       {offer!!.company.description}
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12}>
                                                   <Divider/>
                                               </Grid>
                                               <Grid item xs={3}>
                                                   <Typography color={"primary"}>
                                                       Contract type
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={9}>
                                                   <Typography>
                                                       {offer!!.contractType}
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12}>
                                                   <Divider/>
                                               </Grid>
                                               <Grid item xs={3}>
                                                   <Typography color={"primary"}>
                                                       Location
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={9}>
                                                   <Typography>
                                                       {offer!!.cityName}
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} className={classes.map} id={"mapContainer"}>
                                                   <ReactBingmaps
                                                       bingmapKey={API_KEY}
                                                       center={[offer!!.latitude, offer!!.longitude]}
                                                       pushPins={[
                                                           {
                                                               location: [offer!!.latitude, offer!!.longitude],
                                                               option: {color: "black"},
                                                           }
                                                       ]}
                                                       zoom={15}
                                                   />
                                               </Grid>
                                           </Grid>
                                       }
                                       footer={
                                           <Grid container spacing={2}>
                                               <Grid item xs={12}>
                                                   <CustomLink to={`/offers/${id}/update`}>
                                                       <Button color={"secondary"} variant={"contained"}>
                                                           Update offer
                                                       </Button>
                                                   </CustomLink>
                                                   <Button className={classes.deleteButton} variant={"contained"} onClick={(event) => {
                                                       store.dispatch({
                                                           type: "OFFER/DELETE",
                                                           payload: {
                                                               id: offer!!.id,
                                                               jwt: jwt!!
                                                           }
                                                       })
                                                   }
                                                   }>
                                                       Delete offer
                                                   </Button>
                                               </Grid>
                                           </Grid>
                                       }
                        />
                        }
                        {/*TODO copy paste for offer */}
                        {(userId == null || userId != offer!!.memberId) &&
                        <CustomBigCard title={offer!!.title}
                                       subheader={"The following describes the offer."}
                                       avatar={<Note color={"primary"}/>}
                                       content={
                                           <Grid container spacing={2}>
                                               <Grid item xs={12}>
                                                   <Typography>
                                                       {offer!!.description}
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12}>
                                                   <Divider/>
                                               </Grid>
                                               <Grid item xs={3}>
                                                   <Typography color={"primary"}>
                                                       Company
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={9}>
                                                   <Typography>
                                                       {offer!!.company.name}
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={3}/>
                                               <Grid item xs={9}>
                                                   <Typography>
                                                       {offer!!.company.description}
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12}>
                                                   <Divider/>
                                               </Grid>
                                               <Grid item xs={3}>
                                                   <Typography color={"primary"}>
                                                       Contract type
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={9}>
                                                   <Typography>
                                                       {offer!!.contractType}
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12}>
                                                   <Divider/>
                                               </Grid>
                                               <Grid item xs={3}>
                                                   <Typography color={"primary"}>
                                                       Location
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={9}>
                                                   <Typography>
                                                       {offer!!.cityName}
                                                   </Typography>
                                               </Grid>
                                               <Grid item xs={12} className={classes.map} id={"mapContainer"}>
                                                   <ReactBingmaps
                                                       bingmapKey={API_KEY}
                                                       center={[offer!!.latitude, offer!!.longitude]}
                                                       pushPins={[
                                                           {
                                                               location: [offer!!.latitude, offer!!.longitude],
                                                               option: {color: "black"},
                                                           }
                                                       ]}
                                                       zoom={15}
                                                   />
                                               </Grid>
                                           </Grid>
                                       }
                        />
                        }
                    </>
                    }

                </Box>
            </Container>
        </Page>
    )
}

