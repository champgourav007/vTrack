export const TimeSheetType = {
    GET_TIMESHEET_DATA: 'GET_TIMESHEET_DATA',
    SET_TIMESHEET_DATA: 'SET_TIMESHEET_DATA',
    SET_TIMESHEET_PERIOD_ID: 'SET_TIMESHEET_PERIOD_ID',
    SET_TIMESHEET_PERIOD_WEEK: 'SET_TIMESHEET_PERIOD_WEEK',
    SAVE_TIMESHEET_DATA: 'SAVE_TIMESHEET_DATA',
    SAVE_TIMESHEET_PERIOD_DATA: 'SAVE_TIMESHEET_PERIOD_DATA',
    UPDATE_TIMESHEET_DATA: 'UPDATE_TIMESHEET_DATA',
    DELETE_TIMESHEET_DATA: 'DELETE_TIMESHEET_DATA',
    GET_PROJECT_TASKS_DATA: 'GET_PROJECT_TASKS_DATA',
    SET_PROJECT_TASKS_DATA: 'SET_PROJECT_TASKS_DATA',
    UPDATE_TIMESHEET_STATUS: 'UPDATE_TIMESHEET_STATUS'
  }
  
  export const getTimeSheetData = (data) => 
  ({
    type: TimeSheetType.GET_TIMESHEET_DATA,
    payload: data,
  });
  
  export const deleteTimeSheetData = (timeSheetDetailId) => 
  ({
    type: TimeSheetType.DELETE_TIMESHEET_DATA,
    payload: {timeSheetDetailId},
  });
  
  export const setTimeSheetData = (data) => 
  ({
    type: TimeSheetType.SET_TIMESHEET_DATA,
    payload: data,
  });
  
  export const saveTimeSheetData = (data) => 
  ({
    type: TimeSheetType.SAVE_TIMESHEET_DATA,
    payload: { data },
  });
  
  export const saveTimeSheetPeriodData = (data) => 
  ({
    type: TimeSheetType.SAVE_TIMESHEET_PERIOD_DATA,
    payload: { data },
  });

  export const updateTimeSheetData = (data) => 
  ({
    type: TimeSheetType.UPDATE_TIMESHEET_DATA,
    payload: { data },
  });

  export const setTimeSheetPeriodId = (data) => 
  ({
    type: TimeSheetType.SET_TIMESHEET_PERIOD_ID,
    payload: data,
  });

  export const setTimeSheetPeriodWeek = (data) => 
  ({
    type: TimeSheetType.SET_TIMESHEET_PERIOD_WEEK,
    payload: data,
  });

  export const getProjectTasks = () => 
  ({
    type: TimeSheetType.GET_PROJECT_TASKS_DATA,
  });

  export const setProjectTasks = (data) => 
  ({
    type: TimeSheetType.SET_PROJECT_TASKS_DATA,
    payload: data,
  });

  export const updateTimeSheetStatus = (data) => 
  ({
    type: TimeSheetType.UPDATE_TIMESHEET_STATUS,
    payload: data,
  });
  