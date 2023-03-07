
export const AppStateType = {
    SET_VTRACK_LOADER: 'SET_VTRACK_LOADER',
    SET_TABLE_LOADER: 'SET_TABLE_LOADER'
  }
  
export const setVtrackLoader = (data) => 
({
  type: AppStateType.SET_VTRACK_LOADER,
  payload: data,
});

export const setTableLoader = (data) =>
({
  type: AppStateType.SET_TABLE_LOADER,
  payload: data,
})