import { configureStore } from "@reduxjs/toolkit";
type State = {
  user: string;
  summonerID: string;
  region: string;
};


type Action = {
  type: string;
  payload: string;
};

function summonerReducer(state: State = {user: "", summonerID: "", region: "eun1"}, action: Action): State {
  switch (action.type) {
    case "CHANGE_SUMMONER_ID":
      return {...state, summonerID: action.payload};
    case "CHANGE_USER":
      return {...state, user: action.payload};
    case "CHANGE_REGION":
      return {...state, region: action.payload};
    default:
      return state;
  }
}

export const store = configureStore({
    reducer: summonerReducer,
});