import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";

export const getClientAdminDetails = (pageNo, pageSize) =>
  httpRequest({
    url: `https://vtrack-api.azurewebsites.net/Client/get-clients?page=${pageNo}&pagesize=${pageSize}&sortBy=ClientName&sortDir=ASC`,
    method: HttpMethod.GET,
  });

export const postClientAdminDetails = (data) =>
  httpRequest({
    url: `https://vtrack-api.azurewebsites.net/Client/createClient`,
    method: HttpMethod.POST,
    data: data,
  });
