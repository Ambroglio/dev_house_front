import {createStore, compose, applyMiddleware, combineReducers} from "redux";
import { install } from "redux-loop";
// @ts-ignore
import logger from "redux-logger";

import userReducer from "./userReducer";
import offerReducer from "./offerReducer";

//const enhancer = compose(install(), applyMiddleware(logger));
// @ts-ignore
const store = createStore(userReducer);

export default store;
