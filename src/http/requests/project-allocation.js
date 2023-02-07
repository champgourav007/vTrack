import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { PROJECT_ALLOCATION_API } from "../api";

export const getProjectAllocationDetails = (pageNo, pageSize, sortDir, sortBy, searchData, status) =>
  httpRequest({
    url: `${PROJECT_ALLOCATION_API}/get-assigned-projects?page=${pageNo}&pagesize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&searchKey=${searchData}&status=${status}`,
    method: HttpMethod.GET,
  });