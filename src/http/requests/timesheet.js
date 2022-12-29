import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { TIMESHEET_API } from "../api";

export const getTimeSheetDetails = (timesheetPeriodWeek,projectId = 0,employeeId = 0) =>
  httpRequest({
    url: `${TIMESHEET_API}/get-timesheet-detail/${timesheetPeriodWeek}/${projectId}/${employeeId}`,
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
