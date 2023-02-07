
export const AppStateType = {
    SET_VTRACK_LOADER: 'SET_VTRACK_LOADER',
  }
  
export const setVtrackLoader = (data) => 
  ({
    type: AppStateType.SET_VTRACK_LOADER,
    payload: data,
  });
  