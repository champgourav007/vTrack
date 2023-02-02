import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { USERS_API } from "../api/services";

export const getUserDetails = () =>
  httpRequest({
    url: `${USERS_API}/active-user-details`,
    method: HttpMethod.GET,
  });

export const getAllUserDetails = () =>
  httpRequest({
    url: `${USERS_API}/get-all-users`,
    method: HttpMethod.GET,
  });

  export const getUnregisteredUsers = () =>
  httpRequest({
    url: `${USERS_API}/get-unregistered-users`,
    method: HttpMethod.GET,
  });
