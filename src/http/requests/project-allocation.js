import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { PROJECT_ALLOCATION_API } from "../api";

export const getProjectAllocationDetails = (pageNo, pageSize, sortDir, sortBy, searchData) =>
  httpRequest({
    url: `${PROJECT_ALLOCATION_API}/get-project-allocation?page=${pageNo}&pagesize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&searchKey=${searchData}`,
    method: HttpMethod.GET,
  });

export const postProjectAllocationDetails = (data) =>
  httpRequest({
    url: `${PROJECT_ALLOCATION_API}/add-project-allocation`,
    method: HttpMethod.POST,
    data: data,
  });

export const updateProjectAllocationDetails = (data) =>
  httpRequest({
    url: `${PROJECT_ALLOCATION_API}/${data.projectAllocationId}/update-project-allocation`,
    method: HttpMethod.PUT,
    data: data,
  });

// export const deleteProjectAllocationDetails = (projectId) =>
//   httpRequest({
//     url: `${PROJECT_ALLOCATION_API}/${projectId}/delete-project-allocation`,
//     method: HttpMethod.DELETE,
//   });
