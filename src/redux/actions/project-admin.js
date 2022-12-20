
export const ProjectAdminType = {
    GET_PROJECT_ADMIN_DATA: 'GET_PROJECT_ADMIN_DATA',
    SET_PROJECT_ADMIN_DATA: 'SET_PROJECT_ADMIN_DATA',
    SAVE_PROJECT_ADMIN_DATA: 'SAVE_PROJECT_ADMIN_DATA',
    UPDATE_PROJECT_ADMIN_DATA: 'UPDATE_PROJECT_ADMIN_DATA',
    DELETE_PROJECT_ADMIN_DATA: 'DELETE_PROJECT_ADMIN_DATA',
  }
  
  export const getProjectAdminData = (data) => 
  ({
    type: ProjectAdminType.GET_PROJECT_ADMIN_DATA,
    payload: data,
  });
  
  export const deleteProjectAdminData = (projectId) => 
  ({
    type: ProjectAdminType.DELETE_PROJECT_ADMIN_DATA,
    payload: {projectId},
  });
  
  export const setProjectAdminData = (data) => 
  ({
    type: ProjectAdminType.SET_PROJECT_ADMIN_DATA,
    payload: data,
  });
  
  export const saveProjectAdminData = (data) => 
  ({
    type: ProjectAdminType.SAVE_PROJECT_ADMIN_DATA,
    payload: { data },
  });
  
  export const updateProjectAdminData = (data) => 
  ({
    type: ProjectAdminType.UPDATE_PROJECT_ADMIN_DATA,
    payload: { data },
  });
  