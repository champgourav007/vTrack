export const ReportingType = {
  GET_TIMESHEET_REPORTS: 'GET_TIMESHEET_REPORTS',
  GET_MISSING_TIMESHEET: 'GET_MISSING_TIMESHEET',
  SET_REPORTING_DATA: 'SET_REPORTING_DATA'
}

export const getTimesheetReports = (data) => 
({
  type: ReportingType.GET_TIMESHEET_REPORTS,
  payload: data,
})

export const getMissingTimesheet = (data) =>
({
  type: ReportingType.GET_MISSING_TIMESHEET,
  payload: data,
})

export const setReportingData = (data) => 
({
  type: ReportingType.SET_REPORTING_DATA,
  payload: data,
})