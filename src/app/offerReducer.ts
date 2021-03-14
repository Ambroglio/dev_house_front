import {compose} from "redux";
import {liftState} from "redux-loop";
import {Offer, OfferAction} from "./offerAction";
import offerApi from "../api/offerApi";
import store from "./store";

export interface OfferState {
    loading: boolean,
    offers: Array<Offer>
}

const initialState = {
    loading: false,
    offers: []
}

const offerReducer = (state: OfferState = initialState, action : OfferAction) => {
    switch (action.type) {
        case "OFFER/RESULT_LIST":
            return {...state, offers: action.payload.offers, loading: false}
        case "OFFER/FETCH_BY_MEMBER_ID":
            offerApi.getOffersByMemberId(action.payload.member_id)
                .then(r => {
                    store.dispatch({
                        type: "OFFER/RESULT_LIST",
                        payload: {
                            offers: r.data
                        }
                    })
                })

            return {...state, loading: true}
        case "OFFER/CREATE":
            offerApi.createOffer(action.payload.jwt, action.payload.data)
                .then(r => {
                    store.dispatch({
                        type: "OFFER/SUCCESS",
                        payload: {
                            message: "Offer successfully created.",
                            data: r.data
                        }
                    })
                })

            return {...state, loading: true}
        case "OFFER/UPDATE":
            offerApi.updateOffer(action.payload.id, action.payload.jwt, action.payload.data)
                .then (r => {
                    store.dispatch({
                        type: "OFFER/SUCCESS",
                        payload: {
                            message: "Offer successfully updated.",
                            data: r.data
                        }
                    })
                })

            return {...state, loading: true}
        case "OFFER/SUCCESS":
            return  {...state, offers: [action.payload.data], loading: false}
        case "OFFER/ERROR":
            return {...state, offers: [], loading: false}
        case "OFFER/FETCH_BY_ID":
            offerApi.getOfferById(action.payload.id)
                .then(r => {
                    store.dispatch({
                        type: "OFFER/SUCCESS",
                        payload: {
                            message: "Offer successfully fetched.",
                            data: r.data
                        }
                    })
                })
                .catch(e => {
                    store.dispatch({
                        type: "OFFER/ERROR",
                        payload: {
                            message: "Error while fetching offer."
                        }
                    })
                })

            return {...state, loading: true}
        default:
            return state
    }
}

export default offerReducer