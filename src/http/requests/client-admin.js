import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";

export const getClientAdminDetails = (pageNo, pageSize, sortDir, sortBy) =>
  httpRequest({
    url: `https://vtrack-api.azurewebsites.net/Client/get-clients?page=${pageNo}&pagesize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,
    method: HttpMethod.GET,
  });

export const postClientAdminDetails = (data) =>
  httpRequest({
    url: `https://vtrack-api.azurewebsites.net/Client/create-client`,
    method: HttpMethod.POST,
    data: data,
  });

export const updateClientAdminDetails = (data) =>
  httpRequest({
    url: `https://vtrack-api.azurewebsites.net/Client/${data.clientId}/update-client`,
    method: HttpMethod.PUT,
    data: data,
  });

export const deleteClientAdminDetails = (clientId) =>
  httpRequest({
    url: `https://vtrack-api.azurewebsites.net/Client/${clientId}/delete-client`,
    method: HttpMethod.DELETE,
  });
