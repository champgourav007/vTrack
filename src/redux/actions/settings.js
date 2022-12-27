export const SettingDataType = {
  GET_USER_ROLE_DATA: "GET_USER_ROLE_DATA",
  SET_USER_ROLE_DATA: "SET_USER_ROLE_DATA",
  SAVE_USER_ROLE_DATA: "SAVE_USER_ROLE_DATA",
  GET_SETTING_TABLE_DATA: 'GET_SETTING_TABLE_DATA',
  SET_SETTING_TABLE_DATA: 'SET_SETTING_TABLE_DATA',
  DELETE_SETTING_TABLE_DATA: 'DELETE_SETTING_TABLE_DATA',
  UPDATE_SETTING_TABLE_DATA: 'UPDATE_SETTING_TABLE_DATA',
};

export const getUserRoleData = () => ({
  type: SettingDataType.GET_USER_ROLE_DATA,
});

export const saveUserRoleData = (data) => ({
  type: SettingDataType.SAVE_USER_ROLE_DATA,
  payload: data,
});

export const setUserRoleData = (data) => ({
  type: SettingDataType.SET_USER_ROLE_DATA,
  payload: data,
});

export const getSettingTableData = ()=>({
  type: SettingDataType.GET_SETTING_TABLE_DATA,
})
export const setSettingTableData = (data)=>({
  type: SettingDataType.SET_SETTING_TABLE_DATA,
  payload:data
})
export const deleteSettingTableData = (userId)=>({
  type: SettingDataType.DELETE_SETTING_TABLE_DATA,
  payload:userId
})
export const updateSettingTableData = (roleId, userId)=>({
  type: SettingDataType.UPDATE_SETTING_TABLE_DATA,
  payload:{userId: userId, roleId:roleId}
})
