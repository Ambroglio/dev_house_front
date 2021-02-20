import { createStore, compose, applyMiddleware } from "redux";
import { install } from "redux-loop";
// @ts-ignore
import logger from "redux-logger";

import reducer, { initialState } from "./userReducer";

const enhancer = compose(install(), applyMiddleware(logger));
// @ts-ignore
const store = createStore(reducer, initialState, enhancer);

export default store;
