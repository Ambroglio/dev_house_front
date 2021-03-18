import React, {useState} from "react";
import ConnectedPage from "../../components/connected/ConnectedPage";
import CustomAppBar from "../../components/CustomAppBar";
import {useSelector} from "react-redux";
import store, {GlobalState} from "../../app/store";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CircularProgress,
    Container, Divider, Grid,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CustomBigCard from "../../components/CustomBigCard";
import {ExpandMore, Note} from "@material-ui/icons";
import CustomLink from "../../components/CustomLink";
import {Loading} from "../../components/Loading";

type Props = {
    me?: boolean
}

export default function MemberOffers(props: Props) {
    const loading = useSelector((state: GlobalState) => state.offerState.loading)
    const member_id = useSelector((state: GlobalState) => state.userState.id)
    const offers = useSelector((state: GlobalState) => state.offerState.offers)
    const [fetch, setFetch] = useState(true)

    if (fetch) {
        store.dispatch({
            type: "OFFER/FETCH_BY_MEMBER_ID",
            payload: {
                member_id: member_id!!
            }
        })
        setFetch(false)
    }

    console.log(offers)

    //TODO check if user is connected for Offers

    return (
        <ConnectedPage>
            <CustomAppBar/>

            <Container>
                {props.me != null && props.me &&
                <CustomBigCard title={"My offers"} subheader={"All your offers are listed here."}
                               avatar={<Note color={"primary"}/>} content={
                    <>
                        <>
                            {offers.map((item => {
                                return (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>{item.title}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        {item.description}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
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
                            }))}
                        </>
                    </>
                }
                               footer={<CustomLink to="/offers/create">
                                   <Button color={"primary"} variant={"contained"}>Create an offer</Button>
                               </CustomLink>}
                />
                }
                {props.me == null || !props.me &&
                <CustomBigCard title={"Offers"} subheader={""}
                               avatar={<Note color={"primary"}/>} content={
                    <>
                        {offers.map((item => {
                            return (
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{item.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography>
                                                    {item.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
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
                        }))}
                    </>
                }
                />
                }

                {loading &&
                <Loading/>
                }
            </Container>
        </ConnectedPage>
    )
}