import { applyMiddleware, combineReducers, createStore } from "redux";
import * as reducers from "./reducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  ...reducers,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
