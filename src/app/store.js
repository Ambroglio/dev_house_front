import { createStore, compose, applyMiddleware } from "redux";
import { install } from "redux-loop";
import logger from "redux-logger";

import reducer, { initialState } from "./reducer";

const enhancer = compose(install(), applyMiddleware(logger));
const store = createStore(reducer, initialState, enhancer);

export default store;
