import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { REPORTING_API } from "../api";


export const getTimesheetReports = (startDate, endDate, projectId, pageNo, pageSize, sortDir, sortBy, searchData) => 
  httpRequest({
    url: `${REPORTING_API}/get-timesheet-reports?startDate=${startDate}&endDate=${endDate}projectId=${projectId}&page=${pageNo}&pagesize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&searchKey=${searchData}`,
    method: HttpMethod.GET,
  });