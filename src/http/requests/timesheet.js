import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { TIMESHEET_API } from "../api";

export const getTimeSheetDetails = (timesheetPeriodWeek) =>
  httpRequest({
    url: `${TIMESHEET_API}/get-timesheet-detail/${timesheetPeriodWeek}/0/0`,
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

// export const updateTimeSheetDetails = (data) =>
//   httpRequest({
//     url: `${TIMESHEET_API}/${data.clientId}/update-client`,
//     method: HttpMethod.PUT,
//     data: data,
//   });

// export const deleteTimeSheetDetails = (clientId) =>
//   httpRequest({
//     url: `${TIMESHEET_API}/${clientId}/delete-client`,
//     method: HttpMethod.DELETE,
//   });
