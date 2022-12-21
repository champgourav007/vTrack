import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";

export const getUserDetails = () =>
  httpRequest({
    url: `https://vtrack-api.azurewebsites.net/Users/active-user-details`,
    method: HttpMethod.GET,
  });

export const getAllUserDetails = () =>
  httpRequest({
    url: `https://vtrack-api.azurewebsites.net/Users/get-all-users`,
    method: HttpMethod.GET,
  });
