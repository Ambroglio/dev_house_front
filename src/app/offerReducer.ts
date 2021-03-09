import {compose} from "redux";
import {liftState} from "redux-loop";
import {OfferAction} from "./offerAction";

export interface OfferState {

}

const initialState = {

}

const offerReducer = (state: OfferState = initialState, action : OfferAction) => {
    return state
}

export default offerReducer