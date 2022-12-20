import { AppStateType } from "../actions";

export const appState = {
  vTrackLoader: false,
};

export const appStateReducer = (state = appState, action) => {
  switch(action.type) {
    case AppStateType.SET_VTRACK_LOADER:
      return {
        ...state,
        vTrackLoader: action.payload,
      };
    default: return state;
  }
};
