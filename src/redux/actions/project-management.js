
export const ProjectManagementType = {
    GET_PROJECT_MANAGEMENT_DATA: 'GET_PROJECT_MANAGEMENT_DATA',
    SET_PROJECT_MANAGEMENT_DATA: 'SET_PROJECT_MANAGEMENT_DATA',
    SAVE_PROJECT_MANAGEMENT_DATA: 'SAVE_PROJECT_MANAGEMENT_DATA',
    UPDATE_PROJECT_MANAGEMENT_DATA: 'UPDATE_PROJECT_MANAGEMENT_DATA',
  }
  
  export const getProjectManagementData = (data) => 
  ({
    type: ProjectManagementType.GET_PROJECT_MANAGEMENT_DATA,
    payload: data,
  });
  
  export const setProjectManagementData = (data) => 
  ({
    type: ProjectManagementType.SET_PROJECT_MANAGEMENT_DATA,
    payload: data,
  });

  export const saveProjectManagementData = (data) => 
  ({
    type: ProjectManagementType.SAVE_PROJECT_MANAGEMENT_DATA,
    payload: {data},
  });

  export const updateProjectManagementData = (data) => 
  ({
    type: ProjectManagementType.UPDATE_PROJECT_MANAGEMENT_DATA,
    payload: {data},
  });
  