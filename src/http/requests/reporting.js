import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { REPORTING_API } from "../api";


export const getTimesheetReports = (startDate, endDate, pageNo, pageSize) => 
  httpRequest({
    url: `${REPORTING_API}/get-timesheet-reports?startDate=${startDate}&endDate=${endDate}`,
    method: HttpMethod.GET,
  });