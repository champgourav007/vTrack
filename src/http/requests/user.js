import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";

export const getUserDetails = () =>
  httpRequest({
    url: `https://graph.microsoft.com/v1.0/me/photo/$value`,
    method: HttpMethod.GET,
  });
