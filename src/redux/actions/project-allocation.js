
export const ProjectAllocationType = {
    GET_PROJECT_ALLOCATION_DATA: 'GET_PROJECT_ALLOCATION_DATA',
    SET_PROJECT_ALLOCATION_DATA: 'SET_PROJECT_ALLOCATION_DATA',
    SAVE_PROJECT_ALLOCATION_DATA: 'SAVE_PROJECT_ALLOCATION_DATA',
    UPDATE_PROJECT_ALLOCATION_DATA: 'UPDATE_PROJECT_ALLOCATION_DATA',
    DELETE_PROJECT_ALLOCATION_DATA: 'DELETE_PROJECT_ALLOCATION_DATA',
  }
  
  export const getProjectAllocationData = (data) => 
  ({
    type: ProjectAllocationType.GET_PROJECT_ALLOCATION_DATA,
    payload: data,
  });
  
  export const deleteProjectAllocationData = (clientId) => 
  ({
    type: ProjectAllocationType.DELETE_PROJECT_ALLOCATION_DATA,
    payload: {clientId},
  });
  
  export const setProjectAllocationData = (data) => 
  ({
    type: ProjectAllocationType.SET_PROJECT_ALLOCATION_DATA,
    payload: data,
  });
  
  export const saveProjectAllocationData = (data) => 
  ({
    type: ProjectAllocationType.SAVE_PROJECT_ALLOCATION_DATA,
    payload: { data },
  });
  
  export const updateProjectAllocationData = (data) => 
  ({
    type: ProjectAllocationType.UPDATE_PROJECT_ALLOCATION_DATA,
    payload: { data },
  });
  