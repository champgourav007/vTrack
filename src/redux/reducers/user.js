import { UserType } from "../actions/user";

export const userState = {
  userData: null,
  allUserDetails: null
}

export const userReducer = (state = userState, action) => {
  switch(action.type) {
    case UserType.SET_USER_DETAILS:
      return {
        ...state,
        userData: action.payload,
      };
    case UserType.SET_ALL_USER_DETAILS:
      return {
        ...state,
        allUserDetails: action.payload,
      };
    default: return state;
  }
};
