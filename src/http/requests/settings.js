import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { ROLES_API, USER_DETAILS } from "../api/services";

export const getUserRoles = () =>
  httpRequest({
    url: `${ROLES_API}/get-roles`,
    method: HttpMethod.GET,
  });

export const saveUserRoles = (data) =>
  httpRequest({
    url: `${ROLES_API}/${data.roleID}/add-user-role`,
    method: HttpMethod.POST,
    data: data.data,
  });

  export const getSettingUserData = () =>
  httpRequest({
    url: `${ROLES_API}/get-users`,
    method: HttpMethod.GET,
  });

  export const deleteSettingUserData = (userId) =>
  httpRequest({
    url: `${ROLES_API}/${userId}/delete-user`,
    method: HttpMethod.DELETE,
  });

  export const updateSettingUserRole = (userId, roleId) =>
  httpRequest({
    url: `${ROLES_API}/${userId}/${roleId}/update-user-role`,
    method: HttpMethod.PUT,
  });

  export const syncAzureData = () =>
  httpRequest({
    url: `${USER_DETAILS}/sync-users`,
    method: HttpMethod.GET
  })

  export const updateNotificationForUser = (userId) => 
  httpRequest({
    url: `${USER_DETAILS}/${userId}/update-notification-for-user`,
    method: HttpMethod.PUT
  })