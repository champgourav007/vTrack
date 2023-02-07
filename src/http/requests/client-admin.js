import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest, httpRequestForFile } from "../../common/utils/http-request";
import { CLIENT_API } from "../api";

export const getClientAdminDetails = (pageNo, pageSize, sortDir, sortBy, searchData) =>
  httpRequest({
    url: `${CLIENT_API}/get-clients?page=${pageNo}&pagesize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&searchKey=${searchData}`,
    method: HttpMethod.GET,
  });

export const postClientAdminDetails = (data) =>
  httpRequest({
    url: `${CLIENT_API}/create-client`,
    method: HttpMethod.POST,
    data: data,
  });

export const updateClientAdminDetails = (data) =>
  httpRequest({
    url: `${CLIENT_API}/${data.clientId}/update-client`,
    method: HttpMethod.PUT,
    data: data,
  });

export const deleteClientAdminDetails = (clientId) =>
  httpRequest({
    url: `${CLIENT_API}/${clientId}/delete-client`,
    method: HttpMethod.DELETE,
  });

export const postClientAdminFile = (data) =>
  httpRequestForFile({
    url: `${CLIENT_API}/upload-msa?clientId=${data.id}&clientName=${data.name}`,
    method: HttpMethod.POST,
    data: data.data
  });