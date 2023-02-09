import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { PROJECT_MANAGEMENT_API, USER_DETAILS } from "../api";

export const getProjectManagementDetails = (projectId, pageNo, pageSize, sortDir, sortBy, searchData) =>
  httpRequest({
    url: `${PROJECT_MANAGEMENT_API}/get-project-allocation?projectId=${projectId}&page=${pageNo}&pagesize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&searchKey=${searchData}`,
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

export const getMappedProjectManagementData = ()=>
httpRequest({
  url:`${USER_DETAILS}/get-projects-for-pm`,
  method: HttpMethod.GET
})  

export const deleteProjectManagementDetail = (projectAllocationId) =>
  httpRequest({
    url: `${PROJECT_MANAGEMENT_API}/${projectAllocationId}/delete-project-allocation`,
    method: HttpMethod.DELETE,
  });