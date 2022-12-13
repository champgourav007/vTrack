
export const ClientAdminType = {
  GET_CLIENT_ADMIN_DATA: 'GET_CLIENT_ADMIN_DATA',
  SET_CLIENT_ADMIN_DATA: 'SET_CLIENT_ADMIN_DATA',
  SAVE_CLIENT_ADMIN_DATA: 'SAVE_CLIENT_ADMIN_DATA',
}

export const getClientAdminData = (data) => 
({
  type: ClientAdminType.GET_CLIENT_ADMIN_DATA,
  payload: data,
});

export const setClientAdminData = (data) => 
({
  type: ClientAdminType.SET_CLIENT_ADMIN_DATA,
  payload: data,
});

export const saveClientAdminData = (data) => 
({
  type: ClientAdminType.SAVE_CLIENT_ADMIN_DATA,
  payload: { data },
});
