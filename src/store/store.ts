import {combineReducers, configureStore } from "@reduxjs/toolkit";
type State = {
  user: string;
  summonerID: string;
};


type Action = {
  type: string;
  payload: string;
};

function summonerReducer(state: State = {user: "", summonerID: ""}, action: Action): State {
  switch (action.type) {
    case "CHANGE_summonerID":
      return {...state, summonerID: action.payload};
    case "CHANGE_USER":
      return {...state, user: action.payload};
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  summoner: summonerReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});