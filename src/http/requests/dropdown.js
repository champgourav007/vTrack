import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { DROPDOWN } from "../api";

export const getProjectManagersList = () =>
  httpRequest({
    url: `${DROPDOWN}/get-project-managers`,
    method: HttpMethod.GET,
  });

export const getAllClients = () =>
  httpRequest({
    url: `${DROPDOWN}/get-all-clients`,
    method: HttpMethod.GET,
  });

export const getListItems = (code) =>
  httpRequest({
    url: `${DROPDOWN}/${code}/get-list-items`,
    method: HttpMethod.GET,
  });

export const getAllUsers = () =>
  httpRequest({
    url: `${DROPDOWN}/get-all-users`,
    method: HttpMethod.GET,
  });

export const getAllProjectsDetails = () =>
  httpRequest({
    url: `${DROPDOWN}/get-all-projects`,
    method: HttpMethod.GET,
  });

export const projectTasksDetails = () =>
  httpRequest({
    url: `${DROPDOWN}/get-project-tasks`,
    method: HttpMethod.GET,
  });

export const getAssignedProjectsDetails = (payload) => 
httpRequest({
  url: `${DROPDOWN}/get-projects-assigned-to-user?startDate=${payload.startDate}&endDate=${payload.endDate}`,
  method: HttpMethod.GET,
  });

export const getReportees = (projectId) => {
  let query = projectId === null ? "" : `?projectId=${projectId}`
  return httpRequest({
    url: `${DROPDOWN}/get-reportees${query}`,
    method: HttpMethod.GET,
  })};

export const getTimesheetProjects = () => 
  httpRequest({
    url: `${DROPDOWN}/get-associated-projects`,
    method: HttpMethod.GET,
  });