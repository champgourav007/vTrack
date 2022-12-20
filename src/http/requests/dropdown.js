import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { DROPDOWN } from "../api";

export const getProjectManagersList = () =>
  httpRequest({
    url: `${DROPDOWN}/get-project-managers`,
    method: HttpMethod.GET,
  });

export const getAllClients = () =>
  httpRequest({
    url: `${DROPDOWN}/get-all-clients`,
    method: HttpMethod.GET,
  });

export const getListItems = (code) =>
  httpRequest({
    url: `${DROPDOWN}/${code}/get-list-items`,
    method: HttpMethod.GET,
  });

export const getAllUsers = () => {
  httpRequest({
    url: `${DROPDOWN}/get-all-users`,
    method: HttpMethod.GET,
  });
}
