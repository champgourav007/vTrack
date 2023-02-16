export const ReportingType = {
  GET_TIMESHEET_REPORTS: 'GET_TIMESHEET_REPORTS',
  SET_TIMESHEET_REPORTS: 'SET_TIMESHEET_REPORTS'
}

export const getTimesheetReports = (data) => 
({
  type: ReportingType.GET_TIMESHEET_REPORTS,
  payload: data,
})

export const setTimesheetReports = (data) => 
({
  type: ReportingType.SET_TIMESHEET_REPORTS,
  payload: data,
})