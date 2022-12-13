import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";

export const getClientAdminDetails = (pageNo, pageSize, sortDir) =>
  httpRequest({
    url: `https://vtrack-api.azurewebsites.net/Client/get-clients?page=${pageNo}&pagesize=${pageSize}&sortBy=ClientName&sortDir=${sortDir}`,
    method: HttpMethod.GET,
  });

export const postClientAdminDetails = (data) =>
  httpRequest({
    url: `https://vtrack-api.azurewebsites.net/Client/createClient`,
    method: HttpMethod.POST,
    data: data,
  });
