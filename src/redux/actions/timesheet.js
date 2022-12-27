export const TimeSheetType = {
    GET_TIMESHEET_DATA: 'GET_TIMESHEET_DATA',
    SET_TIMESHEET_DATA: 'SET_TIMESHEET_DATA',
    SET_TIMESHEET_PERIOD_ID: 'SET_TIMESHEET_PERIOD_ID',
    SAVE_TIMESHEET_DATA: 'SAVE_TIMESHEET_DATA',
    SAVE_TIMESHEET_PERIOD_DATA: 'SAVE_TIMESHEET_PERIOD_DATA',
    UPDATE_TIMESHEET_DATA: 'UPDATE_TIMESHEET_DATA',
    DELETE_TIMESHEET_DATA: 'DELETE_TIMESHEET_DATA',
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
  