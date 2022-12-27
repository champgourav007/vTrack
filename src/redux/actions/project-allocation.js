
export const ProjectAllocationType = {
    GET_PROJECT_ALLOCATION_DATA: 'GET_PROJECT_ALLOCATION_DATA',
    SET_PROJECT_ALLOCATION_DATA: 'SET_PROJECT_ALLOCATION_DATA',
  }
  
  export const getProjectAllocationData = (data) => 
  ({
    type: ProjectAllocationType.GET_PROJECT_ALLOCATION_DATA,
    payload: data,
  });
  
  export const setProjectAllocationData = (data) => 
  ({
    type: ProjectAllocationType.SET_PROJECT_ALLOCATION_DATA,
    payload: data,
  });