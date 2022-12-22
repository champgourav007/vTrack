import { HttpMethod } from "../../common/constants/http-requests";
import { httpRequest } from "../../common/utils/http-request";
import { ROLES_API } from "../api/services";

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
