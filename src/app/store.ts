import {createStore, compose, applyMiddleware, combineReducers} from "redux";
import {install} from "redux-loop";
// @ts-ignore
import logger from "redux-logger";

import userReducer, {UserState} from "./userReducer";
import offerReducer, {OfferState} from "./offerReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export type GlobalState = {
    userState: UserState,
    offerState: OfferState
}

const middleware = [thunk]
// @ts-ignore
let composeEnhancers = composeWithDevTools || compose
if (process.env.NODE_ENV === "production")
    composeEnhancers = compose

//const enhancer = compose(install(), applyMiddleware(logger));
// @ts-ignore
const store = createStore(combineReducers({
        userState: userReducer,
        offerState: offerReducer
    }),
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
