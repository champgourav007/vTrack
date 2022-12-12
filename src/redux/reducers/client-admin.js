import { ClientAdminType } from "../actions"

export const clientAdminState = {
  clientAdminData: null,
}

export const clientAdminReducer = (state = clientAdminState, action) => {
  switch(action.type) {
    case ClientAdminType.SET_CLIENT_ADMIN_DATA:
      return {
        ...state,
        clientAdminData: action.payload,
      };
    default: return state;
  }
};
