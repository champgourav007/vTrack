
export const ClientAdminType = {
  GET_CLIENT_ADMIN_DATA: 'GET_CLIENT_ADMIN_DATA',
  SET_CLIENT_ADMIN_DATA: 'SET_CLIENT_ADMIN_DATA',
  SAVE_CLIENT_ADMIN_DATA: 'SAVE_CLIENT_ADMIN_DATA',
  SAVE_CLIENT_ADMIN_FILE_DATA: 'SAVE_CLIENT_ADMIN_FILE_DATA',
  UPDATE_CLIENT_ADMIN_DATA: 'UPDATE_CLIENT_ADMIN_DATA',
  DELETE_CLIENT_ADMIN_DATA: 'DELETE_CLIENT_ADMIN_DATA',
}

export const getClientAdminData = (data) => 
({
  type: ClientAdminType.GET_CLIENT_ADMIN_DATA,
  payload: data,
});

export const deleteClientAdminData = (clientId) => 
({
  type: ClientAdminType.DELETE_CLIENT_ADMIN_DATA,
  payload: {clientId},
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

export const postClientAdminFile = (data) => 
({
  type: ClientAdminType.SAVE_CLIENT_ADMIN_FILE_DATA,
  payload: { data },
});

export const updateClientAdminData = (data) => 
({
  type: ClientAdminType.UPDATE_CLIENT_ADMIN_DATA,
  payload: { data },
});
