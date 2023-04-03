import { configureStore } from "@reduxjs/toolkit";
//import { State } from '../interfaces/index'

type State = {}
type Action = {
  type: string;
  payload: {};
};

function summonerReducer(state: State, action: Action): State {
  switch (action.type) {
    case "CHANGE_LANG":
      return action.payload;
    default:
      return state;
  }
}

export const store = configureStore({
    reducer: summonerReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});