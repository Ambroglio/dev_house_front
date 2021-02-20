import { createStore, compose, applyMiddleware } from "redux";
import { install } from "redux-loop";
// @ts-ignore
import logger from "redux-logger";

import reducer, { loadState } from "./userReducer";

const enhancer = compose(install(), applyMiddleware(logger));
// @ts-ignore
const store = createStore(reducer, loadState(), enhancer);

export default store;
