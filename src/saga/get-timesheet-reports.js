import { call, put } from "redux-saga/effects";
import { setVtrackLoader } from "../redux/actions";
import { getTimesheetReports, ReportingType, setTimesheetReports } from "../redux/actions/reporting";

function* workerGetTimesheetReports({ payload }){
  try{
    yield put(setVtrackLoader(true));
    const timesheetReports = yield call(
      getTimesheetReports,
      payload.startDate,
      payload.endDate,
      payload.projectId,
      payload.pageNo,
      payload.pageSize,
      payload.sortDir,
      payload.sortBy,
      payload.searchData);
    yield put(setTimesheetReports(timesheetReports));
    yield put(setVtrackLoader(false));
  } catch(err){
    console.log(err);
    yield put(setVtrackLoader(false));
  }
}

export function* getTimesheetReportsSaga() {
  yield takeLatest(
    ReportingType.GET_TIMESHEET_REPORTS,
    workerGetTimesheetReports
  );
};