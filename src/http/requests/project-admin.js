import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { PROJECT_ADMIN_API } from "../api";

export const getProjectAdminDetails = (pageNo, pageSize, sortDir, sortBy, searchData) =>
  httpRequest({
    url: `${PROJECT_ADMIN_API}/get-projects?page=${pageNo}&pagesize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&searchKey=${searchData}`,
    method: HttpMethod.GET,
  });

export const postProjectAdminDetails = (data) =>
  httpRequest({
    url: `${PROJECT_ADMIN_API}/add-project`,
    method: HttpMethod.POST,
    data: data,
  });

export const updateProjectAdminDetails = (data) =>
  httpRequest({
    url: `${PROJECT_ADMIN_API}/${data.projectId}/update-project`,
    method: HttpMethod.PUT,
    data: data,
  });

export const deleteProjectAdminDetails = (projectId) =>
  httpRequest({
    url: `${PROJECT_ADMIN_API}/${projectId}/delete-project`,
    method: HttpMethod.DELETE,
  });
