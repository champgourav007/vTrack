import { UserType } from "../actions/user";

export const userState = {
  userData: null,
}

export const userReducer = (state = userState, action) => {
  switch(action.type) {
    case UserType.SET_USER_DETAILS:
      return {
        ...state,
        userData: action.payload,
      };
    default: return state;
  }
};
