
export const DropdownType = {
    GET_ALL_CLIENTS_DATA: 'GET_ALL_CLIENTS_DATA',
    SET_ALL_CLIENTS_DATA: 'SET_ALL_CLIENTS_DATA',
    GET_PROJECT_MANAGERS_DATA: 'GET_PROJECT_MANAGERS_DATA',
    SET_PROJECT_MANAGERS_DATA: 'SET_PROJECT_MANAGERS_DATA',
    GET_LIST_ITEMS: 'GET_LIST_ITEMS',
    SET_LIST_ITEMS: 'SET_LIST_ITEMS',
    GET_ALL_USERS: 'GET_ALL_USERS',
    SET_ALL_USERS: 'SET_ALL_USERS',
    GET_ALL_PROJECTS_DATA: 'GET_ALL_PROJECTS_DATA',
    SET_ALL_PROJECTS_DATA: 'SET_ALL_PROJECTS_DATA',
    GET_ASSIGNED_PROJECTS_DATA: 'GET_ASSIGNED_PROJECTS_DATA',
    SET_ASSIGNED_PROJECTS_DATA: 'SET_ASSIGNED_PROJECTS_DATA',
    GET_REPORTEES: 'GET_REPORTEES',
    SET_REPORTEES: 'SET_REPORTEES',
    GET_TIMESHEET_PROJECTS: 'GET_TIMESHEET_PROJECTS',
    SET_TIMESHEET_PROJECTS: 'SET_TIMESHEET_PROJECTS',
  }
  
export const getClientsData = () => 
  ({
    type: DropdownType.GET_ALL_CLIENTS_DATA
  });
  
export const setClientsData = (data) => 
  ({
    type: DropdownType.SET_ALL_CLIENTS_DATA,
    payload: data,
  });

export const getProjectManagersData = () => 
  ({
    type: DropdownType.GET_PROJECT_MANAGERS_DATA
  });
  
export const setProjectManagersData = (data) => 
  ({
    type: DropdownType.SET_PROJECT_MANAGERS_DATA,
    payload: data,
  });

export const getListItems = () => 
  ({
    type: DropdownType.GET_LIST_ITEMS
  });
  
export const setListItems = (data) => 
  ({
    type: DropdownType.SET_LIST_ITEMS,
    payload: data,
  });

export const getAllUsersData = () => 
  ({
    type: DropdownType.GET_ALL_USERS
  });
  
export const setAllUsersData = (data) => 
  ({
    type: DropdownType.SET_ALL_USERS,
    payload: data,
  });

export const getAllProjectsData = () => 
  ({
    type: DropdownType.GET_ALL_PROJECTS_DATA,
  });

export const setAllProjectsData = (data) => 
  ({
    type: DropdownType.SET_ALL_PROJECTS_DATA,
    payload: data,
  });

export const getAssignedProjects = () => 
  ({
    type: DropdownType.GET_ASSIGNED_PROJECTS_DATA,
  });

export const setAssignedProjects = (data) => 
  ({
    type: DropdownType.SET_ASSIGNED_PROJECTS_DATA,
    payload: data,
  }); 
  
export const getReportees = (data) => 
  ({
    type: DropdownType.GET_REPORTEES,
    payload: data
  });

export const setReportees = (data) => 
  ({
    type: DropdownType.SET_REPORTEES,
    payload: data,
  }); 

export const getTimesheetProjects = () => 
  ({
    type: DropdownType.GET_TIMESHEET_PROJECTS
  });
  
export const setTimesheetProjects = (data) => 
  ({
    type: DropdownType.SET_TIMESHEET_PROJECTS,
    payload: data,
  });
