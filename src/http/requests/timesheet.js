import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { TIMESHEET_API } from "../api";

export const getTimeSheetDetails = (timesheetPeriodWeek,projectId,employeeId,projectManagerId) =>
  httpRequest({
    url: `${TIMESHEET_API}/get-timesheet-detail?employeeId=${employeeId}&periodWeek=${timesheetPeriodWeek}&projectId=${projectId}&projectManagerId=${projectManagerId}`,
    method: HttpMethod.GET,
  });

export const getTimesheetReportee = (timesheetPeriodWeek) =>{
  httpRequest({
    url : `${TIMESHEET_API}/get-timesheet-reportee?periodWeek=${timesheetPeriodWeek}`,
    method : HttpMethod.GET,
  })
}

export const getMyTimeSheetDetails = (timesheetPeriodWeek,projectId,employeeId) =>
    httpRequest({
        url: `${TIMESHEET_API}/my-timesheets?periodWeek=${timesheetPeriodWeek}`,
        method: HttpMethod.GET,
    });
  
export const postTimeSheetPeriod = (data) =>
  httpRequest({
    url: `${TIMESHEET_API}/create-timesheet-period`,
    method: HttpMethod.POST,
    data: data,
  });

export const postTimeSheetDetails = (data) =>
  httpRequest({
    url: `${TIMESHEET_API}/create-timesheet-detail`,
    method: HttpMethod.POST,
    data: data,
  });

export const updateTimeSheetDetails = (data) =>
  httpRequest({
    url: `${TIMESHEET_API}/update-timesheet-detail`,
    method: HttpMethod.PUT,
    data: data,
  });

export const deleteTimeSheetDetails = (timesheetDetailId) =>
  httpRequest({
    url: `${TIMESHEET_API}/delete-timesheet-detail/${timesheetDetailId}`,
    method: HttpMethod.DELETE,
  });

export const updateTimeSheetStatusDetails = (data) =>
  httpRequest({
    url: `${TIMESHEET_API}/update-timesheet-status`,
    method: HttpMethod.PUT,
    data: data
  });

export const submitPeriodForApproval = (data) =>
  httpRequest({
    url: `${TIMESHEET_API}/submit-period-for-approval`,
    method: HttpMethod.PUT,
    data: data
  });
