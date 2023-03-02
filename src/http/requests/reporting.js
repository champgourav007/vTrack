import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { REPORTING_API } from "../api";


export const getTimesheetReports = (startDate, endDate, projectId) => 
  httpRequest({
    url: `${REPORTING_API}/get-timesheet-reports?startDate=${startDate}&endDate=${endDate}&projectId=${projectId}`,
    method: HttpMethod.GET,
  });

export const getMissingTimesheet = (startDate, endDate) =>
  httpRequest({
    url: `${REPORTING_API}/get-missing-timesheet?startDate=${startDate}&endDate=${endDate}`,
    method: HttpMethod.GET,
  })