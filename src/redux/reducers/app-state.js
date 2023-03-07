import { AppStateType } from "../actions";

export const appState = {
  vTrackLoader: false,
  tableLoader: false
};

export const appStateReducer = (state = appState, action) => {
  switch(action.type) {
    case AppStateType.SET_VTRACK_LOADER:
      return {
        ...state,
        vTrackLoader: action.payload,
      };
    case AppStateType.SET_TABLE_LOADER:
      return{
        ...state,
        tableLoader: action.payload
      };
    default: return state;
  }
};
