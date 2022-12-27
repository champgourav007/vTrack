import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { PROJECT_MANAGEMENT_API } from "../api";

export const getProjectManagementDetails = (pageNo, pageSize, sortDir, sortBy, searchData) =>
  httpRequest({
    url: `${PROJECT_MANAGEMENT_API}/get-project-allocation?page=${pageNo}&pagesize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&searchKey=${searchData}`,
    method: HttpMethod.GET,
  });

export const postProjectManagementDetails = (data) =>
  httpRequest({
    url: `${PROJECT_MANAGEMENT_API}/add-project-allocation`,
    method: HttpMethod.POST,
    data: data,
  });

export const updateProjectManagementDetails = (data) =>
  httpRequest({
    url: `${PROJECT_MANAGEMENT_API}/${data.projectAllocationId}/update-project-allocation`,
    method: HttpMethod.PUT,
    data: data,
  });