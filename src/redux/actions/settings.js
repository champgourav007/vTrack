export const SettingDataType = {
  GET_USER_ROLE_DATA: "GET_USER_ROLE_DATA",
  SET_USER_ROLE_DATA: "SET_USER_ROLE_DATA",
  SAVE_USER_ROLE_DATA: "SAVE_USER_ROLE_DATA",
};

export const getUserRoleData = () => ({
  type: SettingDataType.GET_USER_ROLE_DATA,
});

export const saveUserRoleData = (data) => ({
  type: SettingDataType.SAVE_USER_ROLE_DATA,
  payload: { data },
});

export const setUserRoleData = (data) => ({
  type: SettingDataType.SET_USER_DATA,
  payload: data,
});
